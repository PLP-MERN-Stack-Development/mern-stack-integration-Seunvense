# 📝 MERN Blog Platform

A full-stack **MERN (MongoDB, Express, React, Node.js)** blog application with user authentication, CRUD operations, and real-time UI updates.

---

## 🚀 Project Overview

This application allows users to:

- Register and log in securely using JWT
- Create, read, update, and delete blog posts
- Categorize posts
- Search and filter posts
- View post details with author and metadata
- Enjoy a responsive UI built with Tailwind CSS v4

---

## ✅ Features Implemented

| Feature                                                         | Status  |
| --------------------------------------------------------------- | ------- |
| MongoDB + Mongoose models (`Post`, `Category`, `User`)          | ✅ Done |
| RESTful API with Express                                        | ✅ Done |
| Input validation with Joi                                       | ✅ Done |
| JWT Authentication                                              | ✅ Done |
| Protected routes (`/api/posts`, `/create`)                      | ✅ Done |
| React + Vite frontend                                           | ✅ Done |
| React Router for navigation                                     | ✅ Done |
| Context API for state management (`PostContext`, `AuthContext`) | ✅ Done |
| Optimistic UI updates                                           | ✅ Done |
| Search & filter posts                                           | ✅ Done |
| Responsive design with Tailwind CSS v4                          | ✅ Done |
| Error handling & loading states                                 | ✅ Done |

---

## 🛠️ Tech Stack

**Frontend:**

- React
- Vite
- React Router
- Tailwind CSS v4
- Axios

**Backend:**

- Node.js
- Express
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs

**Tools:**

- Git & GitHub
- Postman
- VS Code

---

## ⚙️ Setup Instructions

**Backend:**
cd server
npm install
.env.example
MONGODB_URI=mongodb://127.0.0.1:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000

Start the backend server:
npm run dev

**Frontend Setup:**
cd ../client
npm install
.env.example
VITE_API_URL=http://localhost:5000/api

Start the frontend:
npm run dev

---

### API Documentation

Base URL:
http://localhost:5000/api

Auth Routes
Method Endpoint Description Body
POST /auth/register Register user { "name", "email", "password" }
POST /auth/login Login user { "email", "password" }

Post Routes
Method Endpoint Description Auth Required
GET /posts Get all posts ❌ No
GET /posts/:id Get single post ❌ No
POST /posts Create post ✅ Yes
PUT /posts/:id Update post ✅ Yes
DELETE /posts/:id Delete post ✅ Yes

Category Routes
Method Endpoint Description
GET /categories Get all categories
POST /categories Create category

---

### Folder Structure

mern-stack-integration-Seunvense/
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ └── services/api.js
│ ├── .env.example
│ └── vite.config.js
├── server/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── .env.example
├── screenshots/
└── README.md

---

### Author

Seunvense
PLP MERN Stack Development
🗓️ November 10, 2025

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-Seunvense.git
cd mern-stack-integration-Seunvense

```
