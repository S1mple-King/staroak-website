# API Routes V3.2

| Route | Method | 用途 |
|---|---|---|
| `/api/health` | GET | 预览站与正式站健康检查 |
| `/api/leads` | POST | 三类表单统一线索入口 |
| `/api/revalidate` | POST | CMS 发布后触发路径刷新 |

## `/api/health`

返回版本、服务名和时间戳，用于部署监测。

## `/api/revalidate`

请求体：

```json
{
  "secret": "REVALIDATE_SECRET",
  "paths": ["/", "/ai-engine", "/industries"]
}
```

用于 Strapi 发布 webhook 触发 ISR / 缓存刷新。
