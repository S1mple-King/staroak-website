# 节点 07C：部署环境与官网生成准备摘要 V3.3

本节点将 StarOak 官网工程从“可接 CMS / Lead API”推进到“可部署、可预览、可交付开发执行”的状态。

## 已新增内容

- Dockerfile：Next.js 生产镜像，采用 standalone 输出。
- docker-compose.preview.yml：前端预览环境。
- docker-compose.full-template.yml：未来 CMS + PostgreSQL 环境模板。
- nginx/staroakx.com.conf：香港服务器 Nginx 反向代理模板。
- scripts：构建、预览部署、冒烟测试、备份脚本。
- static-site：纯静态预览版，可直接上传至任意静态服务器。
- docs/DEPLOYMENT_RUNBOOK_V3.3.md：部署手册。
- docs/STRAPI_CMS_BOOTSTRAP_V3.3.md：Strapi CMS 初始化手册。
- docs/T_DAY_COMMANDS_V3.3.md：上线日命令清单。

## 推荐部署路线

1. 先用 static-site 做最快预览。
2. 同步用 Docker 部署 Next.js 预览站。
3. 再初始化 Strapi + PostgreSQL。
4. 完成三类表单真实提交联调。
5. 通过 T 日清单后公开发布。
