# TradeSense AI Platform

> Professional SaaS Prop Trading Platform with AI-Powered Insights

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-blue)](https://flask.palletsprojects.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-green)](https://www.python.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

TradeSense AI Platform is a comprehensive prop trading platform that combines advanced trading infrastructure with AI-powered market insights. Designed for both novice and experienced traders, the platform offers multi-phase trading challenges, real-time market data, automated trade execution, and sophisticated analytics.

### Key Highlights

- **🤖 AI-Powered Signals** - Machine learning algorithms analyze market patterns 24/7
- **💹 Real-Time Trading** - Execute trades with minimal latency using optimized infrastructure
- **📊 Advanced Analytics** - Comprehensive performance metrics and risk management tools
- **🏆 Gamified Challenges** - Multi-phase prop trading challenges with instant funding
- **🔒 Enterprise Security** - JWT authentication, role-based access control, and encrypted communications
- **📱 Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

---

## ✨ Features

### Trading Features
- ✅ Multi-phase trading challenges ($50K, $100K, $200K)
- ✅ Real-time market data streaming
- ✅ AI-generated trading signals and insights
- ✅ Automated trade execution
- ✅ Advanced charting with TradingView
- ✅ Risk management tools (stop-loss, take-profit, position sizing)
- ✅ Paper trading and live trading modes
- ✅ Multiple broker integrations (Alpaca, Interactive Brokers)

### Platform Features
- ✅ User authentication and authorization
- ✅ Role-based access control (User, Admin, Super Admin)
- ✅ Real-time dashboard with WebSocket updates
- ✅ Global leaderboard and rankings
- ✅ Performance analytics and reporting
- ✅ Payment processing (Stripe integration)
- ✅ Email notifications and alerts
- ✅ Mobile-responsive design

### Technical Features
- ✅ RESTful API architecture
- ✅ WebSocket for real-time updates
- ✅ Background task processing with Celery
- ✅ Redis caching for performance
- ✅ PostgreSQL database with migrations
- ✅ Docker containerization
- ✅ Comprehensive logging and monitoring
- ✅ API documentation with Swagger/OpenAPI

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Load Balancer (Nginx)                  │
└─────────────────────────────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                                  │
┌─────────▼─────────┐              ┌────────▼────────┐
│  Frontend (Next.js)│              │  Backend (Flask)│
│  - React 18        │◄────────────►│  - SQLAlchemy   │
│  - TypeScript      │   REST/WS    │  - JWT Auth     │
│  - Tailwind CSS    │              │  - API v1       │
└────────────────────┘              └─────────┬───────┘
                                              │
                    ┌─────────────────────────┼─────────────────────┐
                    │                         │                     │
           ┌────────▼────────┐     ┌─────────▼────────┐  ┌────────▼────────┐
           │  PostgreSQL     │     │     Redis        │  │  Celery Workers │
           │  - User Data    │     │  - Cache         │  │  - Async Tasks  │
           │  - Trades       │     │  - Sessions      │  │  - Market Data  │
           │  - Challenges   │     │  - Queue         │  │  - AI Signals   │
           └─────────────────┘     └──────────────────┘  └─────────────────┘
```

### Components

1. **Frontend (Next.js)** - User interface and client-side logic
2. **Backend (Flask)** - RESTful API server and business logic
3. **PostgreSQL** - Primary relational database
4. **Redis** - Caching, session storage, and message broker
5. **Celery** - Background task queue for async operations
6. **Nginx** - Reverse proxy and load balancer (production)

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: TradingView Lightweight Charts, Recharts
- **Forms**: React Hook Form + Zod
- **WebSocket**: Socket.io Client

### Backend
- **Framework**: Flask 3.0
- **Language**: Python 3.11+
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Authentication**: Flask-JWT-Extended
- **Task Queue**: Celery
- **WebSocket**: Flask-SocketIO
- **API Docs**: Flask-RESTX (planned)

### Database & Cache
- **Primary DB**: PostgreSQL 15
- **Cache**: Redis 7
- **Time-Series**: TimescaleDB (planned)

### DevOps
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions (planned)
- **Monitoring**: Prometheus + Grafana (planned)
- **Logging**: ELK Stack (planned)
- **Cloud**: AWS / DigitalOcean / Vercel

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Python** 3.11+
- **PostgreSQL** 15+
- **Redis** 7+
- **Docker** & Docker Compose (recommended)

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/yourusername/tradesense-ai-platform.git
cd tradesense-ai-platform

# Start all services with Docker Compose
cd backend
docker-compose up -d

# Backend will be available at http://localhost:5000
# Frontend setup (in a new terminal)
cd ../frontend
npm install
npm run dev

# Frontend will be available at http://localhost:3000
```

### Manual Setup

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements/dev.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
flask init-db
flask seed-db  # Optional: Add test data

# Run development server
python wsgi.py
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

### Default Test Credentials

After seeding the database:

**Admin Account:**
- Email: `admin@tradesense.ai`
- Password: `admin123`

**Test User:**
- Email: `user@tradesense.ai`
- Password: `user123`

---

## 📁 Project Structure

```
Trade_Sense_AI_Platform/
├── backend/                  # Flask backend API
│   ├── app/
│   │   ├── api/             # API endpoints (v1)
│   │   ├── core/            # Core configuration
│   │   ├── models/          # Database models
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Data access layer
│   │   └── utils/           # Utility functions
│   ├── tests/               # Backend tests
│   ├── migrations/          # Database migrations
│   ├── requirements/        # Python dependencies
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── README.md
│
├── frontend/                 # Next.js frontend
│   ├── app/                 # Next.js 14 App Router
│   ├── components/          # React components
│   ├── lib/                 # Libraries and utilities
│   ├── types/               # TypeScript types
│   ├── styles/              # Global styles
│   ├── public/              # Static assets
│   ├── package.json
│   └── README.md
│
├── docs/                     # Project documentation
│   ├── MILESTONE_ROADMAP.md # Development milestones
│   ├── ROADMAP.md           # Feature roadmap
│   └── API.md               # API documentation
│
├── infrastructure/           # Infrastructure as code
│   ├── docker/              # Docker configurations
│   ├── kubernetes/          # K8s manifests (planned)
│   └── terraform/           # Terraform configs (planned)
│
├── QUICK_START.md           # Quick start guide
└── README.md                # This file
```

---

## 💻 Development

### Backend Development

```bash
cd backend

# Run tests
pytest

# Run tests with coverage
pytest --cov=app --cov-report=html

# Format code
black .

# Lint code
flake8 app/

# Create migration
flask db migrate -m "Description"

# Apply migrations
flask db upgrade
```

### Frontend Development

```bash
cd frontend

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Run linting
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild specific service
docker-compose build backend

# Run command in container
docker-compose exec backend flask shell
```

---

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run all tests
pytest

# Run specific test file
pytest tests/test_models.py

# Run with coverage
pytest --cov=app --cov-report=html

# View coverage report
open htmlcov/index.html
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🚢 Deployment

### Production Deployment Checklist

- [ ] Set strong `SECRET_KEY` and `JWT_SECRET_KEY`
- [ ] Configure production database (PostgreSQL)
- [ ] Set up Redis for caching and sessions
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up environment variables
- [ ] Configure logging and monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Load testing and optimization
- [ ] Security audit

### Deployment Options

1. **Docker + VPS** (DigitalOcean, AWS EC2, etc.)
2. **Kubernetes** (AWS EKS, GKE, AKS)
3. **Serverless** (AWS Lambda + API Gateway)
4. **Platform as a Service** (Heroku, Render, Railway)
5. **Frontend**: Vercel, Netlify, AWS Amplify

See individual component READMEs for detailed deployment instructions.

---

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get started quickly
- **[Milestone Roadmap](docs/MILESTONE_ROADMAP.md)** - Development milestones
- **[Feature Roadmap](docs/ROADMAP.md)** - Planned features
- **[Backend README](backend/README.md)** - Backend documentation
- **[Frontend README](frontend/README.md)** - Frontend documentation
- **API Documentation** - Available at `/api/docs` (coming soon)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Workflow

1. Review the [Milestone Roadmap](docs/MILESTONE_ROADMAP.md)
2. Pick an issue or feature to work on
3. Create a branch following naming conventions
4. Write tests for new features
5. Ensure all tests pass
6. Format and lint code
7. Submit PR with detailed description

### Code Style

- **Python**: Follow PEP 8, use Black for formatting
- **TypeScript/React**: Follow Airbnb style guide, use Prettier
- **Commits**: Use conventional commits (feat:, fix:, docs:, etc.)

---

## 🐛 Known Issues & Limitations

- Real-time market data requires external API keys
- AI signals feature requires OpenAI API integration
- Payment processing requires Stripe account setup
- Some features are under development (see roadmap)

---

## 📈 Roadmap

### Milestone 1: Foundation ✅ (Current)
- Backend architecture and API foundation
- Frontend skeleton and landing page
- Database models and migrations
- Docker development environment

### Milestone 2: Authentication (Next)
- User registration and login
- JWT token management
- Password reset functionality
- Email verification

### Milestone 3: Trading Challenges
- Challenge creation and management
- Multi-phase challenge system
- Challenge enrollment and tracking

### Milestone 4: Real-Time Dashboard
- WebSocket integration
- Live market data streaming
- Real-time portfolio updates

See [MILESTONE_ROADMAP.md](docs/MILESTONE_ROADMAP.md) for complete roadmap.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Project Lead**: TradeSense Team
- **Backend Lead**: [Your Name]
- **Frontend Lead**: [Your Name]
- **DevOps**: [Your Name]

---

## 📞 Support & Contact

- **Email**: support@tradesense.ai
- **Documentation**: https://docs.tradesense.ai
- **Discord**: https://discord.gg/tradesense
- **Twitter**: [@tradesense](https://twitter.com/tradesense)
- **Website**: https://tradesense.ai

---

## 🙏 Acknowledgments

- Flask community for excellent documentation
- Next.js team for amazing framework
- TradingView for charting libraries
- All contributors who helped build this platform

---

## ⚠️ Disclaimer

This platform is for educational and demonstration purposes. Trading involves risk. Always do your own research and consult with financial advisors before making investment decisions.

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ by the TradeSense Team**
