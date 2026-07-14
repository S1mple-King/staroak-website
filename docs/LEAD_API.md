# StarOak Lead API V3.2

## 1. 接口

```http
POST /api/leads
Content-Type: application/json
```

## 2. 请求体

```json
{
  "type": "ecosystem",
  "name": "张三",
  "company": "示例公司",
  "email": "name@example.com",
  "phone": "13800000000",
  "topic": "沐洋智联全球增长服务合作",
  "message": "希望了解企业全球增长服务方案",
  "consent": true,
  "sourcePath": "/ecosystem",
  "website": "",
  "utm": {
    "source": "wechat",
    "medium": "social",
    "campaign": "launch"
  }
}
```

## 3. 表单类型

| type | 页面 | 说明 |
|---|---|---|
| ecosystem | `/ecosystem` | 生态合作、AI引擎、全球增长、AI获客、APEX 等合作线索 |
| contact | `/contact` | 商务、媒体、人才、一般咨询 |
| intelligence | `/intelligence` | 星橡智库订阅、报告预约 |

## 4. 入库逻辑

API 会尝试写入 Strapi `leads` 集合：

```text
/api/leads → Strapi /api/leads → PostgreSQL
```

如果没有配置 `STRAPI_API_URL`，接口会以 `preview_without_backend` 模式返回成功，用于前端预览与联调。

## 5. 通知逻辑

如配置：

```env
LEAD_NOTIFY_WEBHOOK_URL=https://example.com/webhook
```

接口会把线索发送到企业微信、钉钉、飞书、Zapier、Make 或自建中转服务。

## 6. 合规逻辑

- 所有表单必须勾选隐私授权；
- APEX / AI量化交易类线索会自动标记 `complianceReviewRequired=true`；
- AI获客和全球增长服务默认按客户授权数据、公开合规信息与合法渠道表达；
- Lead 导出权限应独立授权，避免无关人员访问个人信息。
