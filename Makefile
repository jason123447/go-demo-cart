dev:
	air -c ./.air.toml
build-docker:
	docker-compose up --build
detach-docker-compose:
	docker-compose up -d
docker-db-backup:
	@TIMESTAMP=$$(date +%Y%m%d-%H%M%S) && docker-compose exec db pg_dump -U admin go_demo_db > ./db-backup/db-$${TIMESTAMP}.sql