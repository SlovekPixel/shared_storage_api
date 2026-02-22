# SHARED-STORAGE-API

## Description

A standalone service based on postgresql/in-memory storage to provide fast ttl-driven data storage over HTTP.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# build
$ yarn run build

# production
$ yarn run preview
```

## Run tests

```bash
# unit tests
$ yarn run test
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Project's description of Hexagonal Architecture

- **Application**: the Application folder will contain the application services, facades, handlers and other 
 application specific components which all represent the application layer. It will communicate with Data Access 
 components, message brokers and other external systems through "ports";
- **Domain**: the Domain folder will contain the domain models, value objects, domain events and other domain specific 
 components which all represent the domain layer;
- **Infrastructure**: the Infrastructure folder will contain the Data Access components, message brokers and other external 
 systems which represent the infrastructure layer. It will implement the interfaces (aka ports) defined the application 
 layer;
- **Presenters**: the Presenters folder will contain the controllers, gateways and other user-facing components or APIs.
- **Value-objects** definition originates from Domain Driven Design (DDD). It's an immutable object
 that represents a descriptive aspect of the domain with no conceptual identity.
