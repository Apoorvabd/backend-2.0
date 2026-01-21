
# 🚀 Backend, System Design & DevOps Fundamentals

This repository contains a comprehensive overview of backend engineering,
system design, security, databases, scalability, and DevOps concepts.
Each concept is explained with practical understanding and real-world analogies.

---

## 🌐 1. HTTP Methods

HTTP methods define the action to be performed on a resource.

| Method | Purpose |
|------|--------|
| GET | Fetch data |
| POST | Create data |
| PUT | Replace data |
| PATCH | Update partial data |
| DELETE | Remove data |

**Analogy:**  
Reading menu (GET), placing order (POST), changing order (PUT/PATCH), cancel order (DELETE)

---

## 📡 2. HTTP Status Codes

Status codes indicate server response.

| Code | Meaning |
|----|--------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## 🔐 3. Authentication – OAuth & OIDC

- **OAuth** → Authorization (permission)
- **OIDC** → Authentication (identity)

**Example:**  
Login with Google → Google verifies you & gives permission token.

---

## 🎟️ 4. JWT vs Sessions

| Feature | JWT | Sessions |
|------|-----|---------|
| Storage | Client | Server |
| Stateless | Yes | No |
| Scalability | High | Limited |

**Analogy:**  
Event pass vs entry register.

---

## 🔑 5. Hashing & Salting

- **Hashing** converts password into fixed unreadable form.
- **Salting** adds randomness to prevent attacks.

**Example:**  
Lock + secret spice 🌶️

---

## 🔒 6. Encryption Standards

Used to protect sensitive data.

- AES – symmetric encryption
- RSA – public/private key
- TLS – secure communication (HTTPS)

---

## 🚦 7. Rate Limiting & DDoS Protection

Limits number of requests from a client.

**Analogy:**  
Only 5 tickets per person.

---

## 🔄 8. WebSockets & Real-Time Communication

Enables two-way real-time communication.

**Example:**  
Phone call vs letters.

Used in chat apps, gaming, trading platforms.

---

## 🗄️ 9. Databases & Storage

Databases store data permanently.

- Relational (SQL)
- Non-relational (NoSQL)

---

## 🆚 10. SQL vs NoSQL

| SQL | NoSQL |
|---|---|
| Fixed schema | Flexible schema |
| ACID | BASE |
| Relations | Document / Key-value |

**Analogy:**  
Excel sheets vs JSON notebooks.

---

## 💳 11. ACID Properties

Ensures reliable transactions.

- Atomicity
- Consistency
- Isolation
- Durability

**Example:**  
Bank transfer system.

---

## 📚 12. Indexing Strategies

Indexes speed up data retrieval.

**Analogy:**  
Book index instead of reading entire book.

---

## 🚀 13. Query Optimization

Improving database queries for performance.

**Example:**  
Choosing shortcut roads.

---

## 🧩 14. Normalization vs Denormalization

| Normalization | Denormalization |
|---|---|
| Less duplication | Faster reads |
| More joins | More storage |

---

## 🏗️ 15. System Design & Architecture

Designing scalable, reliable, and maintainable systems.

**Example:**  
Planning a shopping mall layout.

---

## 🧱 16. Monolith vs Microservices

### Monolith
Single tightly-coupled application.

### Microservices
Independent services with separate deployments.

**Analogy:**  
One big shop vs food court.

---

## ⚖️ 17. Load Balancing

Distributes traffic across servers.

**Analogy:**  
Multiple billing counters.

**Tools:** NGINX, AWS ELB

---

## ⚡ 18. Caching Strategies

Stores frequently accessed data in fast memory.

Types:
- Client-side
- Server-side
- CDN

---

## 🧠 19. Redis, Memcached & CDN

- Redis → Cache, sessions, pub/sub
- Memcached → Simple caching
- CDN → Nearest content delivery

---

## 📬 20. Message Brokers

Enable asynchronous communication.

- RabbitMQ → Message queues
- Kafka → Event streaming

**Analogy:**  
Post office 📮

---

## 🐳 21. Docker & Containerization

Packages application with dependencies.

**Analogy:**  
Tiffin box 🍱

---
Backend, System Design & DevOps Fundamentals
===========================================

Code → Test → Build → Deploy


22. CI/CD Pipelines
------------------
CI/CD automates the process of building, testing, and deploying applications.

CI (Continuous Integration):
- Developers frequently merge code
- Automated tests are executed

CD (Continuous Deployment):
- Code is automatically deployed to production

Pipeline Flow:
Code -> Test -> Build -> Deploy

Tools:
- GitHub Actions
- GitLab CI
- Jenkins

Analogy:
Factory assembly line


23. Linux Command Line & Bash Scripting
--------------------------------------
Linux is the backbone of most production servers.

Common Commands:
ls   -> list files
cd   -> change directory
pwd  -> current directory
grep -> search text
ps   -> running processes
top  -> system usage

Bash Scripting:
Used to automate repetitive tasks like backups, deployments, and monitoring.


24. Basic Cloud Services (AWS / GCP / Azure)
-------------------------------------------
Cloud platforms provide scalable, on-demand infrastructure.

Core Services:
- Compute    : EC2 / Virtual Machines
- Storage   : S3 / Blob Storage
- Database  : RDS / Cloud SQL
- Networking: VPC

Analogy:
Renting resources instead of owning hardware


25. Vertical vs Horizontal Scaling
---------------------------------
Vertical Scaling:
- Increase CPU, RAM of a single machine
- Limited scalability

Horizontal Scaling:
- Add more machines
- Highly scalable

Analogy:
One powerful worker vs many workers


26. Database Sharding & Replication
----------------------------------
Replication:
- Multiple copies of the same data
- Improves availability and fault tolerance

Sharding:
- Splitting data across multiple databases
- Improves scalability

Analogy:
Photocopies + files divided by sections


27. Connection Pooling
---------------------
Connection Pooling reuses database connections instead of creating new ones.

Why Needed:
- Database connections are expensive
- Reuse improves performance

Tools:
- HikariCP
- PgBouncer

Analogy:
Taxi stand instead of booking a new taxi every time


28. Testing (Unit, Integration, Load)
------------------------------------
Unit Testing:
- Tests individual functions or modules

Integration Testing:
- Tests interaction between components

Load Testing:
- Tests system behavior under heavy traffic

Tools:
- k6
- JMeter


29. Logging Practices (Structured Logging)
-----------------------------------------
Logging helps debug and monitor applications.

Best Practices:
- Use structured logs (JSON format)
- Use log levels: INFO, WARN, ERROR
- Avoid logging sensitive data
- Centralized logging system

Analogy:
CCTV recordings


30. Monitoring & Alerts
----------------------
Monitoring tracks system health and performance in real time.

Key Metrics:
- CPU usage
- Memory usage
- Response time
- Error rates

Alerts:
- Trigger notifications when thresholds are crossed

Tools:
- Prometheus
- Grafana

Analogy:
Car dashboard warning system
