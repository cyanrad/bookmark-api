dbdown:
	docker compose rm -s -f -v

dbup:
	docker compose up -d
	timeout 2
	prisma migrate deploy
	prisma generate

.PHONY: dbup dbdown