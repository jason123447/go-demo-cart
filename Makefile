dev:
	air -c ./.air.toml
build-docker:
	docker-compose up --build