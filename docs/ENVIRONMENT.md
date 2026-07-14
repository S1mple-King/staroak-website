# 环境变量与上线配置 V3.2

```env
NEXT_PUBLIC_SITE_URL=https://www.staroakx.com
STRAPI_API_URL=
STRAPI_API_TOKEN=
LEAD_NOTIFY_WEBHOOK_URL=
REVALIDATE_SECRET=change-me-before-production
```

## 注意事项

- 不要把密钥写入代码仓库；
- `.env.local` 仅用于本地开发；
- 生产环境变量由部署平台配置；
- 记录负责人和配置位置，不在项目文档中记录密码、Token 或 AccessKey。
