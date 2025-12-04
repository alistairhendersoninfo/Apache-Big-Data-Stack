# docker-compose.yml for minimal POC
version: '3.8'
services:
  kafka:
    image: confluentinc/cp-kafka:latest
    ports: ["9092:9092"]

  flink:
    image: flink:latest
    ports: ["8081:8081"]

  postgres:
    image: postgres:15
    ports: ["5432:5432"]

  superset:
    image: apache/superset:latest
    ports: ["8088:8088"]