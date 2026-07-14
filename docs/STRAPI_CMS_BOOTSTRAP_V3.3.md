# Strapi CMS 初始化手册 V3.3

## 1. 目标

为星橡官网建立 Headless CMS，用于管理：

- Page：7 个一级页面
- Industry：产业布局与四个业务抓手
- Capability：AI 引擎能力
- Article：星橡智库文章
- Report：报告 / 白皮书
- Lead：三类表单线索

## 2. 创建 CMS 项目

建议在独立目录或独立仓库中创建：

```bash
npx create-strapi@latest staroak-cms
cd staroak-cms
```

生产环境建议 PostgreSQL，不建议 SQLite。

## 3. PostgreSQL 环境变量示例

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=staroak_cms
DATABASE_USERNAME=staroak
DATABASE_PASSWORD=请使用安全密码
DATABASE_SSL=false
```

## 4. 内容模型导入

本工程提供草案：

```text
strapi-models/
```

执行方式建议由开发人员手动比对后复制到 Strapi 项目中，避免直接覆盖生产 CMS。

## 5. API Token

为 Next.js 前台创建只读 API Token，用于读取 Page / Industry / Capability / Article / Report。

Lead 模型写入建议通过后端 API 控制，不建议公开写权限。

## 6. Revalidate

CMS 发布后可调用：

```http
POST https://www.staroakx.com/api/revalidate
Authorization: Bearer <REVALIDATE_SECRET>
Content-Type: application/json

{"path":"/industries"}
```

## 7. 权限建议

- 超级管理员：技术负责人
- 内容编辑：品牌 / 内容负责人
- 合规审核：CTO / 合规负责人
- Lead 查看：仅线索负责人和授权管理层
