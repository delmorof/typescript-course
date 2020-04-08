NODE=node

setup:
	@echo ""
	@echo "\t${titlebg} SETUP - FRONTEND ${normal}"
	@echo ""
	@docker-compose run --rm $(NODE) zsh -c "npm install"

shell:
	@docker-compose run --rm $(NODE) zsh

docker-build:
	@docker build -t ts-course-node docker
