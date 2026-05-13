# Project Setup & Deployment Guide

This guide provides the necessary steps to set up and deploy the ShopEZ MERN applications for development and production environments.

## 🛠️ Project Structure
The Agri-Tech inspired ShopEZ project folder contains two main subfolders for the Frontend and Backend.

- **Client**: Contains the React/Vite frontend code.
- **Server**: Contains the Express/Node.js backend code.

---

## 🚀 Step 1: Download and Open the Project
1.  **Clone or Download**: Copy the project folder (e.g., `MERNIntProj`) from your repository or local source.
2.  **Open in IDE**: Open the project folder in VS Code or your preferred editor.

## 🖥️ Step 2: Set Up the Frontend (React App)
a.  **Navigate into the client folder**:
    ```bash
    cd Dashboard/client
    ```
b.  **Install all required frontend packages**:
    ```bash
    npm install
    ```
c.  **Start the React development server**:
    ```bash
    npm run dev
    ```
d.  **Access the application**: The app should now be running locally at `http://localhost:5173`.

## ⚙️ Step 3: Set Up the Backend (Express Server)
a.  **Navigate into the backend folder**:
    ```bash
    cd backend
    ```
b.  **Install all backend dependencies**:
    ```bash
    npm install
    ```
c.  **Configure Environment Variables**:
    Create a new file named `.env` inside the `backend` folder and add your MongoDB connection string:
    ```env
    MONGO_URI=mongodb://localhost:27017/ShopEZ
    PORT=8080
    ```

## 🔥 Step 4: Setup the Auth Backend
a.  **Navigate into the auth-app/backend folder**:
    ```bash
    cd auth-app/backend
    ```
b.  **Install authentication dependencies**:
    ```bash
    npm install
    ```
c.  **Configure `.env`**:
    ```env
    MONGO_URI=mongodb://localhost:27017/ShopEZ_Auth
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    ```

## 🏗️ Step 5: Start All Services via Root
You can use the root-level `package.json` to start all servers simultaneously:
```bash
npm run dev:all
```

---

## 🌎 Production Build Instructions (Deployment)
To prepare the application for a production environment, generate the minified assets:

1.  **Build the Frontend**:
    ```bash
    cd Dashboard/client
    npm run build
    ```
2.  **Deploy Static Assets**: The `dist` folder generated after the build should be hosted on a CDN (like Netlify, Vercel, or AWS S3).
3.  **Deploy Backend APIs**: Deploy the `backend` and `auth-app/backend` to a Node.js hosting provider (like Render, Heroku, or DigitalOcean).
4.  **Database**: Ensure you switch the `MONGO_URI` to a MongoDB Atlas production cluster.
