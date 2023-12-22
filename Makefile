#-----------------------------------------------------------
# Basic Commands
#-----------------------------------------------------------

dev-init: dev-build dev-run

deploy: prod-build prod-run


#-----------------------------------------------------------
# Build Commands
#-----------------------------------------------------------

dev-build: 
	docker build -t ecommerce-vue -f Dockerfile.development .

dev-run:
	docker run -it -p 3000:3000 -v "${CURDIR}/src:/app/src" --name ecommerce-vue-1 ecommerce-vue

prod-build:
	docker build -t ecommerce-vue-prod -f Dockerfile.production .

prod-run:
	docker run -it -p 8080:80 --rm --name ecommerce-vue-prod-1 ecommerce-vue-prod