install:
	npm ci

dev:
	npm run dev

typecheck:
	npm run typecheck

build:
	npm run build

start:
	npm run start

docker-build:
	docker build -t staroak-website:3.4 .

docker-up:
	docker compose -f docker-compose.preview.yml up -d --build

docker-down:
	docker compose -f docker-compose.preview.yml down

smoke:
	bash scripts/smoke-test.sh http://127.0.0.1:3000
