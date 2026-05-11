# projectServices_API

Single root documentation for all 5 services in this project:

- catalog-service
- order-service
- stock-service
- notification-service
- query-service

## 1. Architecture Overview

This project is a NestJS microservices setup with mixed communication styles:

- REST:
  - catalog-service
  - order-service
- gRPC:
  - stock-service
- Kafka consumer:
  - notification-service
- GraphQL gateway/query API:
  - query-service

Infrastructure from docker-compose:

- Zookeeper on 2181
- Kafka on 9092

## 2. Services Summary

### catalog-service

- Type: REST API
- Default port: 3000
- Main routes:
  - POST /products
  - GET /products
  - GET /products/:id
  - PATCH /products/:id
  - DELETE /products/:id

### order-service

- Type: REST API
- Default port: 3001
- Main routes:
  - POST /orders
  - GET /orders
- Integrations:
  - Calls stock-service via gRPC (CheckAndReserve)
  - Publishes Kafka event order.created

### stock-service

- Type: gRPC microservice
- Address: localhost:50051
- Proto file: stock-service/src/proto/stock.proto
- RPC:
  - StockService.CheckAndReserve(StockRequest) -> StockResponse

### notification-service

- Type: Kafka microservice (consumer)
- Kafka broker: localhost:9092
- Event handled:
  - order.created

### query-service

- Type: GraphQL API
- Default port: 3002
- GraphQL endpoint:
  - http://localhost:3002/graphql
- Main queries:
  - products
  - orders
  - orderById(id: Int)

## 3. Prerequisites

- Node.js 18+ (recommended)
- npm
- Docker Desktop (for Kafka and Zookeeper)

## 4. Project Setup (All Services)

From project root:

```bash
cd projectServices_API
```

Install dependencies for each service:

```bash
cd catalog-service && npm install
cd ../order-service && npm install
cd ../stock-service && npm install
cd ../notification-service && npm install
cd ../query-service && npm install
cd ..
```

## 5. Start Infrastructure (Kafka + Zookeeper)

From root:

```bash
docker compose up -d
```

Stop infrastructure:

```bash
docker compose down
```

## 6. Run All 5 Services (Recommended Order)

Open 5 terminals and run:

1. catalog-service

```bash
cd catalog-service
npm run start:dev
```

2. stock-service

```bash
cd stock-service
npm run start:dev
```

3. order-service

```bash
cd order-service
npm run start:dev
```

4. notification-service

```bash
cd notification-service
npm run start:dev
```

5. query-service

```bash
cd query-service
npm run start:dev
```

## 7. Quick Test Flow

### Step A: Create a product (catalog-service)

```http
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Keyboard",
  "price": 99,
  "stock": 20
}
```

### Step B: Create an order (order-service)

```http
POST http://localhost:3001/orders
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2,
  "customerEmail": "user@example.com"
}
```

Expected behavior:

- order-service checks stock via gRPC
- if stock is available, order is confirmed
- order-service publishes order.created to Kafka
- notification-service logs a confirmation message

### Step C: Query with GraphQL (query-service)

Open: http://localhost:3002/graphql

Example query:

```graphql
query {
  orders {
    id
    productId
    quantity
    status
  }
}
```

## 8. Screenshot Placeholders

Screenshot folders already prepared at root:

- docs/screenshots/catalog-service/
- docs/screenshots/order-service/
- docs/screenshots/stock-service/
- docs/screenshots/notification-service/
- docs/screenshots/query-service/

Suggested screenshot file names:

- docs/screenshots/catalog-service/catalog-create-product.png
- docs/screenshots/catalog-service/catalog-get-products.png
- docs/screenshots/order-service/order-create-success.png
- docs/screenshots/order-service/order-create-conflict.png
- docs/screenshots/stock-service/stock-grpc-success.png
- docs/screenshots/stock-service/stock-grpc-insufficient.png
- docs/screenshots/notification-service/notification-order-created-log.png
- docs/screenshots/query-service/query-graphql-orders.png

You can embed screenshots directly in this README:

```markdown
## Catalog - Create Product
![Catalog Create Product](docs/screenshots/catalog-service/catalog-create-product.png)

## Order - Create Success
![Order Create Success](docs/screenshots/order-service/order-create-success.png)
```

## 9. Useful Commands

Run tests inside any service folder:

```bash
npm run test
npm run test:e2e
```

Build for production:

```bash
npm run build
npm run start:prod
```

## 10. Troubleshooting

- Kafka not available:
  - make sure docker compose is up and kafka is running on 9092
- gRPC call fails from order-service:
  - make sure stock-service is running on localhost:50051
- Port already in use:
  - stop conflicting process or override PORT for the service

## 11. Notes

- Data in these services is currently in-memory (not persisted).
- For local development, start all services in dev mode and keep terminals open.
