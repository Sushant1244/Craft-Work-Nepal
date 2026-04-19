# KalaBazzer - Complete Integration Guide

## 🎯 Project Overview

KalaBazzer is a full-stack e-commerce application for selling handmade and traditional handicrafts. It consists of:

- **Backend**: Node.js/Express API with SQLite database
- **Admin Dashboard**: React-based admin panel
- **Customer Frontend**: React customer-facing website
- **Database**: SQLite with Sequelize ORM

---

## ✨ What's Been Connected

### ✅ Backend & Database
- Express server with CORS enabled
- SQLite database with migration support
- JWT authentication with bcrypt password hashing
- Product, User, and Category models
- File upload system for product images

### ✅ Admin Dashboard
- Connected to backend API
- Authenticated login system
- Real-time data fetching
- API service layer with axios interceptors
- Environment variable support

### ✅ API Integration Layer
Created comprehensive API service files:
- `apiClient.js` - Axios instance with authentication
- `authApi.js` - Authentication endpoints
- `productApi.js` - Product CRUD operations
- `orderApi.js` - Order management
- `inventoryApi.js` - Inventory management

---

## 🚀 Quick Start

### Option 1: Using Shell Script (macOS/Linux)
```bash
chmod +x start-all.sh
./start-all.sh
```

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd Backend
npm install
npm run dev
```

**Terminal 2 - Admin:**
```bash
cd Admin
npm install
npm run dev
```

**Terminal 3 - Client:**
```bash
cd Client
npm install
npm run dev
```

---

## 🔐 Authentication Setup

### Create Admin User

The application is pre-configured but needs an admin user in the database.

**Option A: Create via Code**
```bash
cd Backend
node seed.js
```

**Option B: Manual SQLite Entry**
```bash
sqlite3 database.sqlite
```

```sql
INSERT INTO "Users" (name, email, password, "createdAt", "updatedAt")
VALUES ('Admin User', 'admin@example.com', '$2a$10$YOUR_BCRYPT_HASH_HERE', datetime('now'), datetime('now'));
```

**Login Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📡 API Architecture

### Request Flow
```
Admin UI → apiClient (with auth) → Express Backend → SQLite Database
```

### Authentication Headers
All protected requests include:
```
Authorization: Bearer {jwt_token}
```

### Error Handling
- Automatic token refresh on 401
- Redirect to login on expired token
- Consistent error responses

---

## 🔧 Environment Variables

### Backend (.env)
```
PORT=4000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production_123456
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:3000
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### Admin (.env)
```
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=KalaBazzer Admin
```

---

## 📚 Available Endpoints

### Auth Routes
```
POST /api/auth/login         - Admin login
POST /api/auth/register      - Create new user
GET  /api/auth/init          - Get current user (protected)
```

### Product Routes
```
GET    /api/product                    - Get all products
POST   /api/product/upload             - Add product with image
GET    /api/product/:id                - Get product by ID
PUT    /api/product/:id                - Update product
DELETE /api/product/:id                - Delete product
GET    /api/product/categories/:name   - Get products by category
```

### User Routes (Protected)
```
GET    /api/users           - Get all users
POST   /api/users           - Create user
GET    /api/users/:id       - Get user by ID
PUT    /api/users/:id       - Update user
DELETE /api/users/:id       - Delete user
```

---

## 📁 Project Structure

```
KalaBazzer/
├── Backend/
│   ├── src/
│   │   ├── controller/
│   │   │   ├── auth/authController.js
│   │   │   ├── product/productController.js
│   │   │   └── user/userController.js
│   │   ├── models/
│   │   │   ├── user/User.js
│   │   │   ├── product.js
│   │   │   ├── category.js
│   │   │   └── Image.js
│   │   ├── middleware/
│   │   │   └── token-middleware.js
│   │   ├── security/
│   │   │   └── jwt-util.js
│   │   ├── route/
│   │   │   ├── auth/authRouter.js
│   │   │   ├── product/productRoute.js
│   │   │   └── user/userRoute.js
│   │   ├── database/index.js
│   │   └── index.js
│   ├── uploads/
│   ├── .env
│   ├── database.sqlite
│   └── package.json
│
├── Admin/
│   ├── src/
│   │   ├── services/
│   │   │   ├── apiClient.js
│   │   │   ├── authApi.js
│   │   │   ├── productApi.js
│   │   │   ├── orderApi.js
│   │   │   └── inventoryApi.js
│   │   ├── core/
│   │   │   ├── public/Adminlogin.jsx
│   │   │   └── private/
│   │   │       ├── dashboard.jsx
│   │   │       ├── Product.jsx
│   │   │       ├── Order.jsx
│   │   │       └── Inventory.jsx
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
├── Client/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── CONNECTION_GUIDE.md
├── start-all.sh
└── README.md
```

---

## 🧪 Testing the Connection

### 1. Test Backend API
```bash
# Get all products
curl http://localhost:4000/api/product

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'
```

### 2. Test Admin Dashboard
- Open http://localhost:5173
- Login with admin@example.com / admin123
- Verify dashboard loads with data

### 3. Check Database
```bash
cd Backend
sqlite3 database.sqlite
.tables
.schema Users
SELECT * FROM "Users";
```

---

## 🐛 Common Issues

### CORS Errors
**Solution:** Verify CORS_ORIGIN in .env includes your frontend URL

### 401 Unauthorized
**Solution:** Check JWT_SECRET is the same in all JWT operations

### Database Connection Failed
**Solution:** Delete database.sqlite and restart backend

### Images Not Uploading
**Solution:** Check uploads/ directory exists and is writable

### Cannot login
**Solution:** Verify admin user exists in database

---

## 📦 Package Dependencies

### Backend
- express, body-parser, cors
- sequelize, sqlite3, pg
- jsonwebtoken, bcryptjs
- multer (file uploads)
- dotenv, nodemon

### Admin
- react, react-router-dom
- axios, vite
- react-hook-form
- lucide-react, react-icons

### Client
- react, react-router-dom
- axios, vite
- react-hook-form

---

## 🚀 Deployment

### Production Checklist
- [ ] Change JWT_SECRET in .env
- [ ] Set NODE_ENV=production
- [ ] Update CORS_ORIGIN to production URLs
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable HTTPS
- [ ] Set up environment variables on server
- [ ] Create production build: `npm run build`
- [ ] Use process manager (PM2)

---

## 📞 Support & Documentation

- See `CONNECTION_GUIDE.md` for detailed connection setup
- Check backend `src/` for controller implementations
- Review API service files for usage examples

---

## ✅ Integration Status

| Component | Status | Details |
|-----------|--------|---------|
| Backend Server | ✅ Connected | Running on port 4000 |
| Admin Dashboard | ✅ Connected | Running on port 5173 |
| Database (SQLite) | ✅ Connected | Sequelize ORM |
| Authentication | ✅ Configured | JWT + bcrypt |
| API Layer | ✅ Created | Axios with interceptors |
| Product Management | ✅ Ready | CRUD operations |
| File Upload | ✅ Ready | Multer configured |
| CORS | ✅ Enabled | All origins configured |

---

## 🎉 Ready to Use!

Your KalaBazzer application is now fully connected. All frontend, backend, and database components are integrated and ready for development.

Happy coding! 🚀
