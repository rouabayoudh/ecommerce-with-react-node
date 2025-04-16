# Set COMPOSE_PROJECT_NAME to the parent directory's name
PARENT_DIR_NAME := $(shell basename $(shell pwd))
SANITIZED_NAME := $(shell echo $(PARENT_DIR_NAME) | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9_-]/-/g')
export COMPOSE_PROJECT_NAME=$(SANITIZED_NAME)


# Default path setup
COMPOSE_FILES := -f ./docker/docker-compose.yaml -f ./docker/docker-compose.dev.yaml

# Ensure .env file exists and matches .env.example
check-env:
	@if [ ! -f "./docker/.env" ]; then \
		echo "Error: .env file does not exist. Creating one now from .env.example ..."; \
		cp ./docker/.env.example ./docker/.env; \
	fi
	@echo "Checking .env file for missing variables..."
	@awk -F '=' 'NR==FNR {a[$$1]; next} !($$1 in a) {print "Missing env var: " $$1}' ./docker/.env ./docker/.env.example

init:
	cp ./docker/.env.example ./docker/.env

dev: check-env
	docker compose $(COMPOSE_FILES) up -d

start: check-env
	docker compose $(COMPOSE_FILES) up -d --build

stop: check-env
	docker compose $(COMPOSE_FILES) down

destroy: check-env
	docker compose $(COMPOSE_FILES) down -v
