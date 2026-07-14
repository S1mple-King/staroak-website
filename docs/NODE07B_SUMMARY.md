# 节点 07B 交付摘要｜CMS 与表单接口接入准备

## 本轮完成

- 将 V3.1 内容集成版升级为 V3.2；
- 新增 `/api/leads` 表单统一提交接口；
- 新增 `/api/health` 健康检查接口；
- 新增 `/api/revalidate` CMS 发布刷新接口；
- 新增 Strapi 六类内容模型 schema；
- 新增隐私政策与免责声明页面；
- 表单从前端演示升级为可提交到 API；
- Lead API 已支持 Strapi 入库、Webhook 通知、预览模式、honeypot 防垃圾、合规分流；
- 表单选项已纳入沐洋智联、星藤智能科技、企业AI效能平台、APEX；
- Footer 增加隐私政策和免责声明入口；
- Sitemap 增加 `/privacy` 与 `/disclaimer`。

## 仍需配置

- `STRAPI_API_URL`；
- `STRAPI_API_TOKEN`；
- `LEAD_NOTIFY_WEBHOOK_URL`；
- `REVALIDATE_SECRET`；
- 正式表单接收人和 SLA；
- 隐私政策、免责声明、AI量化交易合规终审。

## 下一步

节点 07C：预览环境部署与真实联调。
