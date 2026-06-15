# ShopEZ: Full-Stack MERN E-Commerce Platform

ShopEZ is a full-stack MERN e-commerce platform featuring a customer storefront and an admin portal. It supports authentication, product management, inventory tracking, order management, and role-based access control.

## Tech Stack

### Frontend
- React.js
- Vite

### Backend
- Node.js
- Express.js
- Express Router

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT Authentication
- Bcrypt.js Password Hashing
- OTP-Based Password Reset

## ✨ Features
### Customer Portal
- User Registration & Login
- Product Search & Filtering
- Shopping Cart Management
- Order Placement
- Responsive User Interface
### Admin Portal
- Product Creation & Deletion
- Inventory Management
- Order Management
- User Management

## 🚀 Quick Launch

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **MongoDB** installed locally or access to a MongoDB Atlas cluster.

### 2. Setup Backends
- **Main Backend (Port 8080):**
  ```bash
  cd backend
  npm install
  nodemon index.js
  ```
- **Auth Backend (Port 5000):**
  ```bash
  cd auth-app/backend
  npm install
  nodemon server.js
  ```

### 3. Setup Frontends
- **Customer Dashboard (Port 5173):**
  ```bash
  cd Dashboard/client
  npm install
  npm run dev
  ```
- **Admin Portal (Port 5174):**
  ```bash
  cd Admin
  npm install
  npm run dev
  ```

## 📂 Documentation

For detailed technical specifications, architecture diagrams, and deployment guides, please refer to the **[docs/](docs/)** folder:

- **[System Architecture](docs/architecture.md)**: MVC Pattern, Backend Scaling & Tech Stack.
- **[Database Design](docs/database_design.md)**: ER Diagrams & MongoDB Schemas.
- **[User Flow](docs/user_flow.md)**: Customer & Admin journey maps.
- **[Deployment Guide](docs/deployment_guide.md)**: Build instructions & environment variables.

## 🛡️ Mandatory Functionalities
- ✅ **MVC Architecture**: Fully implemented across all backends.
- ✅ **JWT Authentication**: Secure token-based access with OTP reset support.
- ✅ **React-Vite**: High-performance frontend build pipeline.
- ✅ **Protected Routes**: Role-based access control (Admin vs. Customer).
- ✅ **Modern Responsive UI**: Responsive UI with dark-mode glassmorphism design.

---
