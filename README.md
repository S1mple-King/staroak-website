# StarOak Official Website V3.4 — Phase 1/2 Validated

星橡集团官网工程包，包含 Next.js 前端、Lead API、Strapi CMS 字段草案、Docker 部署配置、Nginx 模板和 V3.3 历史静态快照。V3.4 当前实现以 Next.js 工程为准。

## 最快预览

```bash
npm ci
npm run dev
```

访问 `http://localhost:3000`。`static-site/` 仅用于回溯 V3.3，不应作为 V3.4 验收预览。

## Production 模式预览

```bash
npm run typecheck
npm run lint
npm run build
PORT=3100 npm run start
```

访问 `http://localhost:3100`。

## Docker 预览

```bash
cp .env.example .env.production
bash scripts/deploy-preview.sh
```

## 生产建议

- 前端：Next.js Docker standalone。
- 反向代理：Nginx + HTTPS。
- CMS：Strapi + PostgreSQL，独立部署。
- 表单：`POST /api/leads`，后续接 Strapi Lead 模型和企业通知 Webhook。

## 重要文档

- `docs/STAROAK_WEBSITE_MASTER_PRD_V3.4.md`
- `docs/PRD_GAP_REPORT.md`
- `docs/DEPLOYMENT_RUNBOOK_V3.3.md`
- `docs/STRAPI_CMS_BOOTSTRAP_V3.3.md`
- `docs/T_DAY_COMMANDS_V3.3.md`
- `docs/LEAD_API.md`
- `docs/QA_CHECKLIST.md`
