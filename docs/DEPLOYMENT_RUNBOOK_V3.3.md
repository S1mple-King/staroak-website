# 星橡官网部署环境与生成手册 V3.3

## 0. 当前建议

首版采用“前端先上线 + CMS/表单逐步联调”的节奏：

- 预览最快方式：上传 `static-site/` 到任意静态 Web 目录。
- 正式前端方式：Next.js + TypeScript + Docker + Nginx + HTTPS。
- CMS 方式：Strapi 自托管 + PostgreSQL，待后台内容运营需要时接入。

Next.js 官方支持以 Node.js Server、Docker 或静态导出等方式部署；本工程选择 Docker / Node.js Server 作为正式路线，因为需要 `/api/leads`、`/api/health` 和 `/api/revalidate` 等服务端接口。Strapi 官方部署要求使用 Active LTS 或 Maintenance LTS 的 Node.js 版本，并建议生产环境使用正式数据库，因此本手册采用 Node 22 LTS 与 PostgreSQL 作为默认执行口径。

## 1. 本地开发环境

建议环境：

- Node.js：22 LTS
- npm：随 Node 安装
- Git
- Docker / Docker Compose，可选但推荐

命令：

```bash
unzip StarOak_Official_Website_Code_V3.3_Deploy_Ready.zip
cd staroak-website-v3.3
cp .env.example .env.local
npm install
npm run dev
```

访问：

```text
http://localhost:3000
```

健康检查：

```bash
curl http://localhost:3000/api/health
```

## 2. 本地构建检查

```bash
npm run typecheck
npm run build
npm run start
```

或：

```bash
bash scripts/build-check.sh
```

## 3. Docker 预览环境

```bash
cp .env.example .env.production
# 编辑 .env.production，至少设置 NEXT_PUBLIC_SITE_URL 和 REVALIDATE_SECRET
bash scripts/deploy-preview.sh
```

验证：

```bash
bash scripts/smoke-test.sh http://127.0.0.1:3000
```

## 4. 香港服务器部署流程

### 4.1 上传代码

```bash
scp StarOak_Official_Website_Code_V3.3_Deploy_Ready.zip user@server:/opt/staroak/
ssh user@server
cd /opt/staroak
unzip StarOak_Official_Website_Code_V3.3_Deploy_Ready.zip
cd staroak-website-v3.3
```

### 4.2 配置环境变量

```bash
cp .env.example .env.production
nano .env.production
```

最少填写：

```env
NEXT_PUBLIC_SITE_URL=https://www.staroakx.com
REVALIDATE_SECRET=请替换为长随机字符串
LEAD_OWNER_EMAIL=info@staroakx.com
COMPLIANCE_OWNER=CTO
```

CMS 与通知接口暂未接入时可以留空。

### 4.3 启动前端容器

```bash
docker compose -f docker-compose.preview.yml up -d --build
bash scripts/smoke-test.sh http://127.0.0.1:3000
```

### 4.4 配置 Nginx

将模板复制到 Nginx：

```bash
sudo cp nginx/staroakx.com.conf /etc/nginx/sites-available/staroakx.com.conf
sudo ln -s /etc/nginx/sites-available/staroakx.com.conf /etc/nginx/sites-enabled/staroakx.com.conf
sudo nginx -t
sudo systemctl reload nginx
```

SSL 可以通过云厂商证书或 Certbot 配置。证书未配置前，不要切正式域名。

## 5. 纯静态预览版

无需 Node，直接上传：

```text
static-site/
```

到服务器 Web 根目录即可预览。该版本适合内部视觉 / 文案验收，不含真实 API、CMS、Lead 入库。

## 6. 上线前硬门禁

- `/`、`/about`、`/ai-engine`、`/industries`、`/intelligence`、`/ecosystem`、`/contact` 全部 200。
- `/ai-core` 能兼容跳转至 `/ai-engine`。
- `/privacy`、`/disclaimer` 可访问。
- `/api/health` 返回 ok。
- 三类表单提交、通知、入库或预览模式均可解释。
- 隐私政策、免责声明、AI量化交易风险提示完成复核。
- DNS / SSL / CDN / 回滚点确认。
- S0 / S1 缺陷清零。

## 7. 不要提交到代码库的内容

- 云服务 AccessKey / SecretKey
- 数据库密码
- Webhook 密钥
- 邮箱密码
- 管理后台密码
- 私人手机号、身份证或营业执照敏感扫描件

只记录负责人和平台，不记录密钥本身。
