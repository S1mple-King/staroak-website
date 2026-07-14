# StarOak 官网 Strapi 接入说明 V3.2

## 1. 接入目标

V3.2 不是把官网做成重后台系统，而是在静态优先官网基础上，预留可控的 Headless CMS 能力：

- 固定页面内容可后台管理；
- AI 引擎能力卡片可维护；
- 产业布局中的四个业务抓手可维护；
- 星橡智库文章 / 报告可维护；
- 三类表单统一进入 Lead 模型。

## 2. 推荐部署

- Strapi 自托管；
- PostgreSQL 生产数据库；
- 对象存储保存图片和报告文件；
- CMS 后台不直接暴露给公开访问，建议后台路径保护、强密码、IP 白名单或 VPN；
- 每日数据库备份，至少保留 7–30 天。

## 3. 内容模型

模型草案位于：

```text
strapi-models/api/*/content-types/*/schema.json
```

包含：

| 模型 | 用途 |
|---|---|
| Page | 7 个一级页面内容 |
| Industry | 沐洋智联、星藤智能科技、企业AI效能、APEX 等产业服务抓手 |
| Capability | AI 引擎六类能力 |
| Article | 星橡智库文章 |
| Report | 报告 / 白皮书预约 |
| Lead | 生态合作、联系我们、报告预约 / 订阅表单线索 |

## 4. 环境变量

```env
STRAPI_API_URL=https://cms.example.com
STRAPI_API_TOKEN=your-read-write-token
LEAD_NOTIFY_WEBHOOK_URL=https://your-webhook.example.com
REVALIDATE_SECRET=change-me
```

## 5. 内容发布流程

```text
资料收集 → CMS 草稿 → 品牌审核 → 必要时合规审核 → 发布 → 触发 /api/revalidate → 前台刷新
```

涉及 AI量化交易、金融科技、个人信息收集、全球增长数据来源等内容，必须进入合规审核。
