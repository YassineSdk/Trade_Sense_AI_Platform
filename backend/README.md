# TradeSense AI Platform - Backend

> Professional prop trading platform backend built with Flask, PostgreSQL, and Redis

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Database Management](#database-management)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## 🎯 Overview

The TradeSense AI Platform backend is a RESTful API service that powers a comprehensive prop trading platform. It provides authentication, trading challenge management, real-time market data, trade execution, AI-powered signals, and performance analytics.

## ✨ Features

- 🔐 **JWT Authentication** - Secure user authentication with role-based access control
- 📊 **Trading Challenges** - Multi-phase challenge management system
- 💹 **Real-time Market Data** - Live market data streaming with WebSocket support
- 🤖 **AI Trading Signals** - Machine learning-powered trading insights
- 📈 **Performance Analytics** - Comprehensive trading metrics and statistics
- 🏆 **Global Leaderboard** - Real-time trader rankings
- 💳 **Payment Integration** - Stripe payment processing
- 🔄 **Background Tasks** - Celery-powered async task processing
- 📝 **Comprehensive Logging** - Structured logging with error tracking
- 🐳 **Docker Support** - Containerized deployment ready

## 🛠 Tech Stack

### Core Framework
- **Flask 3.0** - Web framework
- **Python 3.11+** - Programming language
- **SQLAlchemy 2.0** - ORM and database toolkit
- **Alembic** - Database migrations

### Data Stores
- **PostgreSQL 15** - Primary database (production)
- **SQLite** - Development database
- **Redis 7** - Caching and session storage

### Task Queue
- **Celery** - Distributed task queue
- **Redis** - Message broker

### Authentication & Security
- **Flask-JWT-Extended** - JWT token management
- **Werkzeug** - Password hashing
- **Flask-CORS** - Cross-origin resource sharing

### Development Tools
- **pytest** - Testing framework
- **Black** - Code formatter
- **Flake8** - Linting
- **Docker** - Containerization

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.11 or higher**
- **PostgreSQL 15+** (for production)
- **Redis 7+** (for caching)
- **Docker & Docker Compose** (optional, for containerized setup)
- **Git**

---

## 🚀 Installation

### Option 1: Local Setup (Without Docker)

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/tradesense-ai-platform.git
cd tradesense-ai-platform/backend
```

#### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
# Install base requirements
pip install -r requirements/base.txt

# For development, install dev requirements
pip install -r requirements/dev.txt
```

#### 4. Set Up Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

#### 5. Initialize Database

```bash
# Initialize database tables
flask init-db

# Run migrations (if any)
flask db upgrade

# Seed database with sample data
flask seed-db
```

#### 6. Run the Application

```bash
# Development server
python wsgi.py

# Or using Flask CLI
flask run --host=0.0.0.0 --port=5000
```

The API will be available at `http://localhost:5000`

---

### Option 2: Docker Setup (Recommended)

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/tradesense-ai-platform.git
cd tradesense-ai-platform/backend
```

#### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env if needed
```

#### 3. Start Services with Docker Compose

```bash
# Start core services (PostgreSQL, Redis, Backend)
docker-compose up -d

# Or start with all services including Celery and management tools
docker-compose --profile full up -d

# Or start with database management tools
docker-compose --profile tools up -d
```

#### 4. Check Service Status

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f backend

# Check health
curl http://localhost:5000/health
```

---

## ⚙️ Configuration

### Environment Variables

Key environment variables to configure:

```bash
# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your-secret-key

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/tradesense

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET_KEY=your-jwt-secret

# CORS
CORS_ORIGINS=http://localhost:3000

# Logging
LOG_LEVEL=DEBUG
```

See `.env.example` for complete configuration options.

---

## 🗄️ Database Management

### Migrations

```bash
# Create a new migration
flask db migrate -m "Description of changes"

# Apply migrations
flask db upgrade

# Rollback last migration
flask db downgrade

# View migration history
flask db history
```

### CLI Commands

```bash
# Initialize database tables
flask init-db

# Seed database with test data
flask seed-db

# Reset database (WARNING: deletes all data)
flask reset-db
```

### Default Test Users

After running `flask seed-db`:

- **Admin User**
  - Email: `admin@tradesense.ai`
  - Password: `admin123`
  - Role: Super Admin

- **Test User**
  - Email: `user@tradesense.ai`
  - Password: `user123`
  - Role: User

---

## 📚 API Documentation

### Health Check Endpoints

```bash
# Basic health check
GET /health

# API v1 root
GET /api/v1/

# Ping endpoint
GET /api/v1/ping

# API information
GET /api/v1/info
```

### Testing Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Expected response:
{
  "status": "healthy",
  "service": "tradesense-api",
  "version": "1.0.0",
  "database": "connected",
  "cache": "healthy"
}

# API v1 root
curl http://localhost:5000/api/v1/

# Ping
curl http://localhost:5000/api/v1/ping
```

### API Endpoints (Coming in future milestones)

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/users/profile` - Get user profile
- `GET /api/v1/challenges` - List challenges
- `POST /api/v1/trades` - Create trade
- `GET /api/v1/market-data/symbols/{symbol}` - Get market data

Full API documentation will be available at `/docs` after completion.

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_models.py

# Run with verbose output
pytest -v

# Run tests matching a pattern
pytest -k "test_user"
```

### Test Structure

```
tests/
├── __init__.py
├── conftest.py              # Pytest fixtures
├── test_models.py           # Model tests
├── test_api.py              # API endpoint tests
├── test_auth.py             # Authentication tests
└── test_services.py         # Service layer tests
```

---

## 🐳 Docker Deployment

### Basic Commands

```bash
# Build and start all services
docker-compose up --build

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v

# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec backend flask shell

# Rebuild a specific service
docker-compose build backend
```

### Docker Profiles

```bash
# Core services only (PostgreSQL, Redis, Backend)
docker-compose up -d

# With Celery workers
docker-compose --profile full up -d

# With management tools (pgAdmin, Redis Commander)
docker-compose --profile tools up -d

# All services
docker-compose --profile full --profile tools up -d
```

### Management UIs

When running with `--profile tools`:

- **pgAdmin** (PostgreSQL Management): http://localhost:5050
  - Email: `admin@tradesense.ai`
  - Password: `admin`

- **Redis Commander**: http://localhost:8081

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py           # Application factory
│   ├── api/
│   │   └── v1/
│   │       ├── __init__.py   # API v1 blueprint
│   │       ├── auth.py       # Authentication endpoints
│   │       ├── users.py      # User endpoints
│   │       ├── challenges.py # Challenge endpoints
│   │       └── trades.py     # Trading endpoints
│   ├── core/
│   │   ├── config.py         # Configuration
│   │   ├── database.py       # Database utilities
│   │   ├── cache.py          # Redis cache
│   │   └── exceptions.py     # Custom exceptions
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base.py           # Base model
│   │   └── user.py           # User model
│   ├── services/             # Business logic
│   ├── repositories/         # Data access layer
│   ├── utils/                # Utility functions
│   └── middleware/           # Custom middleware
├── migrations/               # Alembic migrations
├── tests/                    # Test suite
├── requirements/
│   ├── base.txt              # Production requirements
│   └── dev.txt               # Development requirements
├── .env.example              # Environment template
├── .gitignore
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose config
├── wsgi.py                   # WSGI entry point
└── README.md                 # This file
```

---

## 🔧 Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write code following PEP 8 style guide
- Add tests for new functionality
- Update documentation as needed

### 3. Run Code Quality Checks

```bash
# Format code
black .

# Check linting
flake8 app/

# Run tests
pytest
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

---

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error

```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

#### Redis Connection Error

```bash
# Check Redis status
docker-compose ps redis

# Test Redis connection
redis-cli -h localhost -p 6379 -a tradesense_redis_password ping
```

#### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process or change port in .env
```

---

## 📊 Performance Monitoring

### Logging

Logs are stored in `logs/tradesense.log`

```bash
# View logs
tail -f logs/tradesense.log

# Docker logs
docker-compose logs -f backend
```

### Metrics (Future Implementation)

- Prometheus metrics endpoint: `/metrics`
- Grafana dashboard for visualization
- Sentry for error tracking

---

## 🔒 Security

### Best Practices

- ✅ Never commit `.env` files
- ✅ Use strong `SECRET_KEY` and `JWT_SECRET_KEY`
- ✅ Enable HTTPS in production
- ✅ Use environment variables for sensitive data
- ✅ Keep dependencies updated
- ✅ Implement rate limiting
- ✅ Use prepared statements (SQLAlchemy ORM)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 👥 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📞 Support

For questions and support:

- 📧 Email: support@tradesense.ai
- 📖 Documentation: https://docs.tradesense.ai
- 🐛 Issues: https://github.com/yourusername/tradesense/issues

---

## 🎉 Acknowledgments

- Flask community for excellent documentation
- SQLAlchemy for powerful ORM
- All contributors who helped build this platform

---

**Built with ❤️ by the TradeSense Team**