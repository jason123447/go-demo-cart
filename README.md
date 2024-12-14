`Demo Project: Practice for Building a Backend with Golang`

### This project is a hands-on practice for developing a backend application using Golang. It includes key components of a modern backend architecture, such as:

- **Gin Framework:** For handling HTTP requests and building RESTful APIs.
- **GORM:** For database interaction and ORM (Object-Relational Mapping).
- **PostgreSQL:** As the database management system.
- **Validation:** Implementing data validation with the go-playground/validator library.
- **Middleware:** Custom middleware for error handling, validation, and other common tasks.
- **Transaction:** Implementing transaction with gorm
- **Authentication:** Implementing jwt token authentication


### The project demonstrates foundational concepts such as:

1. Structuring a backend application into Controller/Handler, Service, and Repository layers (MVC-like pattern).
2. Database operations such as creating and managing resources using GORM.
Error handling, logging, and data validation best practices.
3. Implementing a modular and reusable codebase.


This is intended for personal learning and experimentation with Go development. It is not intended for production use, but it serves as a sandbox to explore backend development techniques.


## How to Start up

### Prerequisites
- `Node.js` >=18.17.0
- `npm` >= 9.0.0
- `Golang` 1.23.2
- `Docker` 24.0.7

### Install
#### Frontend
1. Navigate to the frontend directory:
```bash
cd frontend/shopping-cart
```
2. Install dependencies:
```bash
npm install
```
3. Start the application:
```bash
npm run start
```

#### Database
1. Start up database
```bash
make build-docker
```

#### Backend
1. Install dependencies:
```bash
go mod tidy
```
2. Start up Go api services:
```bash
make dev
```