dev-dbdown:
	docker compose rm dev-db -s -f -v

# the timeout is just in case the system is slow
dev-dbup:
	docker compose up dev-db -d
	timeout 2
	prisma migrate deploy
	prisma generate

test-dbdown:
	docker compose rm test-db -s -f -v

test-dbup:
	docker compose up test-db -d
	timeout 2 
	prisma migrate deploy
	prisma generate

test-dbreset:
	make test-dbdown
	dotenv -f ".env.testing" run make test-dbup

.PHONY: dev-dbup dev-dbdown test-dbup test-dbdown test-dbreset