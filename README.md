# Helix

An AI-powered conversational platform designed to provide intelligent, real-time chat capabilities with message persistence and multi-threaded conversations.

- Access here: https://mygpt-frontend-zshn.onrender.com

## Overview

Helix is a full-stack web application that enables users to have interactive conversations with AI assistants while maintaining organized conversation history. The platform supports multiple AI providers and offers robust user authentication and data management.

## Features

- **User Authentication**: Secure signup, login, and JWT-based authentication
- **Conversation Threads**: Create and manage multiple independent conversations
- **AI-Powered Responses**: Integrated with multiple AI providers (OpenAI, Google GenAI, HuggingFace)
- **Message History**: Persistent storage of all user and AI messages within conversations
- **Thread Management**: View, create, and delete conversation threads
- **Account Management**: Secure user account deletion with cascading data cleanup
- **Real-time Communication**: RESTful API for seamless frontend-backend interaction

## Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering for AI responses
- **React Spinners** - Loading indicators

### Backend
- **Node.js with Express.js** - Server framework
- **Sequelize** - ORM for database management
- **PostgreSQL / MySQL** - Relational database
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **AI Integrations**:
  - OpenAI API
  - Google GenAI
  - HuggingFace Inference API

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** or **MySQL** database server
- API keys for AI providers (OpenAI, Google GenAI, or HuggingFace)

## Installation

### Step 1: Clone and Navigate

```bash
cd project-name
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
DB_DIALECT=postgres  # or mysql

# Server Configuration
PORT=5000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# AI Provider Keys (choose at least one)
OPENAI_API_KEY=your_openai_api_key            # add this in src/utils/ai.js code
HF_TOKEN=your_huggingface_api_key    # recommended because of no code changes
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Building and Running

### Development Mode

**Start the backend server:**

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

**In a new terminal, start the frontend development server:**

```bash
cd frontend
npm run dev
```

The frontend should typically run on `http://localhost:5173`

### Production Build

**Build the frontend:**

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `dist/` directory.

**For backend production deployment:**

```bash
cd backend
npm install --production
# Run with your preferred process manager (e.g., PM2, systemd)
node src/server.js
```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| `POST` | `/signup` | Register a new user | No |
| `POST` | `/login` | Authenticate and receive JWT token | No |
| `POST` | `/verify` | Verify valid JWT token | Yes |

**Request/Response Examples:**

**Signup:**
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

# Response
{
  "success": true,
  "message": "Signup successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

# Response
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Verify:**
```bash
POST /api/auth/verify
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Verification successful",
  "data": {}
}
```

### Thread Routes (`/api/threads`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| `GET` | `/` | Get all threads for authenticated user | Yes |
| `POST` | `/` | Create new thread and get initial AI response + new thread title | Yes |
| `GET` | `/:threadId` | Get complete thread with all messages | Yes |
| `POST` | `/:threadId` | Send message to existing thread | Yes |
| `DELETE` | `/:threadId` | Delete a thread and its messages | Yes |

**Request/Response Examples:**

**Get All Threads:**
```bash
GET /api/threads
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Threads retreival successful.",
  "data": {
    "threads": [
      { "id": "1", "title": "Python Tips" },
      { "id": "2", "title": "Web Development" }
    ]
  }
}
```

**Create New Thread:**
```bash
POST /api/threads
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "How do I learn React?"
}

# Response
{
  "success": true,
  "message": "AI response generation successful",
  "data": {
    "threadId": 1,
    "title": "Learning React",
    "aiResponse": "React is a popular JavaScript library for..."
  }
}
```

**Get Thread Details:**
```bash
GET /api/threads/1
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Thread successfully retreived.",
  "data": {
    "title": "Learning React",
    "messages": [
      { "role": "user", "content": "How do I learn React?" },
      { "role": "robot", "content": "React is a popular JavaScript library..." }
    ]
  }
}
```

**Send Message to Thread:**
```bash
POST /api/threads/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "Can you provide examples?"
}

# Response
{
  "success": true,
  "message": "AI response successfully generated",
  "data": {
    "aiResponse": "Here are some examples of React components..."
  }
}
```

**Delete Thread:**
```bash
DELETE /api/threads/1
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Thread 1 successfully deleted.",
  "data": {}
}
```

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| `DELETE` | `/` | Delete user account and all associated data | Yes |

**Request/Response Example:**

**Delete Account:**
```bash
DELETE /api/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "password": "securepassword123"
}

# Response
{
  "success": true,
  "message": "User Sucessfully Deleted.",
  "data": {}
}
```

## Project Structure

```
Helix/
├── backend/
│   ├── src/
│   │   ├── server.js           # Express server entry point
│   │   ├── models/
│   │   │   ├── User.js         # User model
│   │   │   ├── Thread.js       # Thread/conversation model
│   │   │   ├── Message.js      # Message model
│   │   │   ├── associations.js # Model relationships
│   │   │   └── index.js        # Database connection
│   │   ├── routes/
│   │   │   ├── auth.js         # Authentication endpoints
│   │   │   ├── threads.js      # Thread management endpoints
│   │   │   └── user.js         # User management endpoints
│   │   └── utils/
│   │       ├── auth.js         # JWT utilities
│   │       ├── ai.js           # AI provider integration
│   │       ├── asyncHandler.js # Async error handling
│   │       ├── errorHandler.js # Global error handler
│   │       ├── logger.js       # Request logging
│   │       ├── response.js     # Standardized responses
│   │       └── notFoundHandler.js # 404 handling
│   └── package.json            # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx           # React entry point
│   │   ├── App.jsx            # Main App component
│   │   ├── MyContext.jsx      # Context API setup
│   │   ├── ChatWindow/        # Chat interface component
│   │   ├── Sidebar/           # Conversation sidebar
│   │   ├── AuthPage/          # Login/signup views
│   │   ├── HomePage/          # Home view
│   │   └── DeleteModal/       # Delete confirmation modal
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── eslint.config.js       # ESLint configuration
│   ├── index.html             # HTML entry point
│   └── package.json           # Frontend dependencies
│
└── README.md                  # This file
```

## Database Schema

### User Table
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `createdAt`
- `updatedAt`

### Thread Table
- `id` (Primary Key)
- `userId` (Foreign Key)
- `title`
- `createdAt`
- `updatedAt`

### Message Table
- `id` (Primary Key)
- `role` (user/robot)
- `content` (Message text)
- `threadId` (Foreign Key)
- `createdAt`
- `updatedAt`

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users register or login to receive a JWT token
2. Token is stored on the client-side
3. Token is included in the `Authorization` header for protected routes
4. Backend validates token using the JWT secret

**Auth Header Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "body": {}
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad request or validation error
- `401` - Unauthorized or invalid credentials
- `404` - Resource not found
- `500` - Server error

## Running Tests

Currently, no automated tests are configured. Consider adding Jest and React Testing Library for comprehensive test coverage.

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL/MySQL is running
- Verify database credentials in `.env`
- Check that the specified database exists

### AI Response Errors
- Verify API keys are correctly set in `.env`
- Check API rate limits
- Ensure sufficient API credits

### CORS Errors
- Confirm frontend URL is allowed in backend CORS configuration
- Check that `VITE_API_BASE_URL` matches backend server address

### JWT Token Errors
- Ensure `JWT_SECRET` is properly configured
- Verify token is included in request headers

## Performance Considerations

- Message history is retrieved from database on each thread view request
- Consider implementing lazy-loading for large conversation histories
- AI response times depend on selected provider and message complexity

## Security Recommendations

- Use strong JWT_SECRET in production
- Enable HTTPS in production environment
- Implement rate limiting on authentication endpoints
- Regularly update dependencies
- Validate and sanitize all user inputs
- Store sensitive API keys securely (use environment variables)

## Future Enhancements

- Lazy-loading for message history
- Message search functionality
- User profiles and settings
- Conversation sharing capabilities
- Export conversation history
- Conversation tagging/categorization
- Response regeneration
- Custom AI model selection per thread
