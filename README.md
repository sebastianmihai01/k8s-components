# k8s-components

Reusable component template (cannot be used standalone!) to be used with K8s, also compatible with microservices in mind
Written in both TS and Python (not dockerised or transformed into any helm chart)

## 🚀 Features

- **AWS Lambda Handlers**: Reusable base classes for creating AWS Lambda functions
- **Event Bus Integration**: Kafka producers and consumers for event-driven architectures
- **CDN Caching**: CloudFront configuration handlers for content delivery
- **Message Queues**: SQS queue handlers for asynchronous processing
- **Notifications**: SNS service integration for pub/sub messaging
- **Microservices**: Base service template with logging and middleware support
- **Infrastructure as Code**: Terraform modules for AWS infrastructure
- **Container Support**: Docker configurations for Node.js and Python services
- **Kubernetes**: Helm charts for deployment management
- **Logging & Monitoring**: ELK stack integration for centralized logging
- **Load Balancing**: NGINX configuration for API gateway and reverse proxy

## 📋 Prerequisites

- Node.js 18+
- Python 3.11+
- Docker
- Kubernetes cluster
- AWS CLI configured
- Terraform
- Helm

## 🛠 Components

### AWS Lambda

- Base handler with error handling and middleware support
- Example implementations in both TypeScript and Python
- Middleware system for logging and metrics

### Event Bus (Kafka)

- Producer service for message publishing
- Consumer service with error handling
- Support for both TypeScript and Python implementations

### CDN Caching

- CloudFront configuration management
- Cache policy handlers
- TTL management

### Microservices

- Base service template with Express.js
- Logging integration with Winston
- Error handling middleware
- Health check endpoints

### Infrastructure

- Terraform modules for VPC, ECS, and RDS
- Helm charts for Kubernetes deployments
- NGINX configuration for load balancing

### Monitoring & Logging

- ELK stack integration
- Elasticsearch client
- Logstash pipeline configuration
