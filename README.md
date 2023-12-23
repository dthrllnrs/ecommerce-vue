
# VueJS + Docker Ecommerce

A vue js and docker ecommerce application


## Tech Stack

**Client:** VueJS, Docker, Nginx. Bootstrap5

**Server:** Laravel, MySql


## Prerequisites
Local setup of [dthrllnrs/ecommerce-backend](https://github.com/dthrllnrs/ecommerce-backend)
## Run Locally

Install using npm

```bash
  make dev-init
```
  or
```bash
  docker build -f Dockerfile.development .
```
```bash
  docker run -it -p 3000:3000 -v "${CURDIR}/src:/app/src"
```
Your project will be available on [localhost:3000](localhost:3000)
    
## Features

- Browse product catalog
- Add products to cart
- Modify cart product quantity
- Create order
- Order receipt email


## Instructions

### Add to cart
Browse products > Click `Add to cart` > Select quantity

### View cart
Click cart icon in the navbar

### Modify cart product quantity
View cart > Input quantity

### Checkout
View Cart > Click `Proceed to Checkout`
## Demo

[Demo](http://purchasepro.dthrllnrs.com/)

