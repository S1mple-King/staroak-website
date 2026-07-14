# 部署说明草案

## 推荐部署

首版建议采用香港节点部署：

- Node.js 运行 Next.js 服务，支持 redirects、metadata、sitemap。
- 静态资源通过 CDN 缓存。
- CMS 后台与前台分离部署。
- 表单 Lead API 独立部署，避免前台页面与线索系统耦合。

## 环境变量

参考 `.env.example`：

```bash
NEXT_PUBLIC_SITE_URL=https://www.staroakx.com
STRAPI_URL=https://cms.staroakx.com
STRAPI_TOKEN=********
LEAD_API_ENDPOINT=https://api.staroakx.com/leads
NOTIFY_WEBHOOK_URL=********
```

不要将真实 token、AccessKey、密码写入仓库。

## 发布前门禁

- DNS / SSL / CDN 确认。
- `/ai-core` → `/ai-engine` 跳转确认。
- 7 个页面逐页检查。
- 3 类表单真实提交测试。
- 隐私政策、免责声明、AI量化交易风险提示上线。
- S0 / S1 缺陷清零。
- 备份与回滚点确认。
