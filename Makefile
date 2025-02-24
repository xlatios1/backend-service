# Default environment file
ENV_FILE=.env

# Commands
up-local:
	@echo "Starting services with local database..."
	@DEPLOY_POSTGRES=0 docker compose \
		--env-file $(ENV_FILE) \
		up --build -d

down:
	@echo "Stopping and removing all services..."
	@docker compose --env-file $(ENV_FILE) down --volumes

