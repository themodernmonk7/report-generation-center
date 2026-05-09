# Async Report Generation System

A small backend-focused project built to deeply understand:

- BullMQ
- Redis
- Docker
- Background workers
- Queue-based architecture
- Retry mechanisms
- Asynchronous processing
- Job progress tracking

The goal of this project was to simulate a real-world async workflow where heavy report generation is offloaded from the request-response cycle into background workers.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS

## Backend

- NestJS
- BullMQ
- Redis
- Docker
- TypeScript

---

# Project Overview

This application simulates an async report generation workflow.

Instead of generating reports directly inside the API request cycle, the backend:

1. Accepts the request instantly
2. Pushes a job into BullMQ
3. Processes the report asynchronously in a worker
4. Tracks job progress
5. Allows downloading the generated report after completion

---

# Architecture

```txt
Frontend
   ↓
NestJS API
   ↓
BullMQ Queue
   ↓
Redis
   ↓
Worker
   ↓
Generate Report File
```

---

# Features

- Async report generation
- BullMQ queue integration
- Redis-based job persistence
- Retry mechanism
- Exponential backoff
- Progress tracking
- Background worker processing
- Dockerized Redis setup
- File generation and download
- Polling-based realtime updates

---

# Learning Goals

This project helped me understand:

## BullMQ Concepts

- producers
- workers
- job lifecycle
- retries
- concurrency
- delayed processing
- progress updates

---

## Redis Concepts

- queue persistence
- job state storage
- worker coordination
- async communication

---

## System Design Concepts

- background job processing
- decoupled architecture
- non-blocking APIs
- retry strategies
- failure handling

---

# API Endpoints

## Generate Report

```http
POST /reports/generate
```

### Request Body

```json
{
  "reportName": "Monthly Sales Report"
}
```

### Response

```json
{
  "message": "Report generation started",
  "jobId": "1"
}
```

---

## Check Job Status

```http
GET /reports/:jobId/status
```

### Response

```json
{
  "jobId": "1",
  "status": "active",
  "progress": 60,
  "result": null,
  "failedReason": null
}
```

---

# Retry Mechanism

BullMQ retries failed jobs automatically.

```ts
attempts: 3,
backoff: {
  type: 'exponential',
  delay: 1000,
}
```

---

# Running Redis Using Docker

```bash
docker run -d -p 6379:6379 redis
```

---

# Local Setup

## 1. Clone Repository

```bash
git clone <repo-url>
```

---

## 2. Install Dependencies

```bash
yarn install
```

---

## 3. Start Redis

```bash
docker run -d -p 6379:6379 redis
```

---

## 4. Start Backend

```bash
yarn run start:dev
```

---

## 5. Start Frontend

```bash
yarn run dev
```

---

# Key Takeaways

This project gave me hands-on understanding of how real-world systems:

- offload heavy tasks
- avoid blocking APIs
- process jobs asynchronously
- recover from failures
- track background task progress
- scale worker-based architectures

---

# Future Improvements

Potential improvements:

- WebSocket-based realtime updates
- Bull Board dashboard
- PostgreSQL integration
- Multiple worker scaling
- Queue monitoring
- Job cancellation
- PDF generation
- Email notifications
