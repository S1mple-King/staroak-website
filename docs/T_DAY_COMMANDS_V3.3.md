# 星橡官网 T 日发布命令清单 V3.3

## T-1 备份

```bash
cd /opt/staroak/staroak-website-v3.3
bash scripts/backup.sh
```

## T 日构建与发布

```bash
git pull || true
cp .env.example .env.production # 首次部署才执行，已有则不要覆盖
# 确认 .env.production 配置

docker compose -f docker-compose.preview.yml up -d --build
bash scripts/smoke-test.sh http://127.0.0.1:3000
```

## Nginx 检查

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 外网检查

```bash
bash scripts/smoke-test.sh https://www.staroakx.com
```

## 回滚

如果出现 S0 / S1：

```bash
docker ps
# 找到上一个镜像或上一个 release tag 后恢复
# 或将 Nginx 指回上一稳定版本 / 备用静态站点
```

## T+72 小时观察

- 访问日志
- 错误日志
- 表单提交记录
- 线索通知情况
- SEO 抓取基础
- 页面性能和移动端反馈
