# Apache Big Data Stack

A comprehensive technical reference covering the Apache Big Data ecosystem and modern FOSS data visualization technologies.

## Overview

This compendium provides detailed documentation, architecture overviews, installation guides, working examples, and security hardening recommendations for 31 key technologies used in modern data platforms.

## Technologies Covered

### Stream Processing & Messaging
- **Apache Kafka** - Distributed event streaming platform
- **Apache Flink** - Stateful stream processing framework
- **Apache Spark** - Unified analytics engine for large-scale data processing

### Data Storage & Table Formats
- **Apache Iceberg** - Open table format for huge analytic datasets
- **Apache Parquet** - Columnar storage format
- **Apache HBase** - Distributed wide-column store
- **Apache Cassandra** - Distributed NoSQL database

### OLAP & Analytics Databases
- **Apache Doris** - Real-time MPP analytical database
- **Apache Druid** - Real-time analytics database
- **Apache Pinot** - Real-time distributed OLAP datastore
- **Apache AsterixDB** - Big Data Management System

### Query Engines
- **Apache Arrow** - Cross-language columnar memory format
- **Apache Drill** - Schema-free SQL query engine

### Workflow Orchestration
- **Apache NiFi** - Data ingestion and distribution system
- **Apache Airflow** - Workflow orchestration platform
- **Apache Hop** - Visual data orchestration platform

### Coordination
- **Apache ZooKeeper** - Distributed coordination service

### Data Visualization Libraries
- **D3.js** - Data-driven documents for web visualizations
- **Apache ECharts** - Powerful charting library
- **FINOS Perspective** - Streaming data visualization
- **Plotly.js** - Scientific charting library
- **Vega & Vega-Lite** - Declarative visualization grammars
- **Observable Plot** - Concise API for exploratory charts

### Business Intelligence Platforms
- **Apache Superset** - Modern data exploration and visualization
- **Grafana** - Observability and monitoring dashboards
- **Redash** - SQL-first analytics platform
- **Metabase** - Self-service business intelligence
- **Cube.js** - Headless BI and semantic layer

## Document Structure

Each technology chapter includes:
- Core capabilities and use cases
- Architecture overview with diagrams
- Installation and configuration (Docker, Kubernetes, bare metal)
- Working code examples
- Security hardening guidelines
- Integration patterns with other technologies

## Scripts

The `scripts/` directory contains all code snippets from the book, organized by technology and ready to use. These include:
- Installation scripts
- Configuration examples
- Producer/consumer implementations
- ETL pipeline examples
- Dashboard configurations
- Security setup scripts

## PDF

The complete compendium is available as `Apache-Big-Data-Stack.pdf` (338 pages).

## License

This is a technical reference document. Individual technologies are subject to their respective Apache 2.0 or other open-source licenses.
