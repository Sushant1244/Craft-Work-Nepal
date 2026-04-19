# KalaBazzer - Frontend, Backend & Database Connection Guide

## ✅ Connection Setup Complete

This guide will help you run and connect all parts of the KalaBazzer application.

---

## 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **SQLite3** (or use the bundled version)

---

## 🔧 Setup Instructions

### 1. Backend Setup

#### Step 1: Navigate to Backend Directory
```bash
cd Backend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Verify Environment Variables
Check `.env` file in Backend folder:
```
PORT=4000
NODE_ENV=development
DB_TYPE=sqlite
DB_STORAGE=./database.sqlite
JWT_SECRET=your_jwt_secret_key_change_this_in_production_123456
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:3000
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

#### Step 4: Start Backend Server
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 4000
📦 API Base URL: http://localhost:4000/api
📁 Uploads Directory: ./uploads
database connected successfully
```

---

### 2. Admin Dashboard Setup

#### Step 1: Navigate to Admin Directory
```bash
cd Admin
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Verify Environment Variables
Check `.env` file in Admin folder:
```
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=KalaBazzer Admin
VITE_ADMIN_PORT=5173
```

#### Step 4: Start Admin Server
```bash
npm run dev
```

Admin should be available at: `http://localhost:5173`

---

### 3. Client Frontend Setup (Optional)

#### Step 1: Navigate to Client Directory
```bash
cd Client
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Start Client Server
```bash
npm run dev
```

Client should be available at: `http://localhost:5174`

---

## 🔐 Authentication Flow

### Create Admin User

Since the application uses a User table, you need to create an admin user in the database.

#### Option 1: Using SQLite CLI
```bash
cd Backend
sqlite3 database.sqlite
```

Then run:
```sql
INSERT INTO "Users" (name, email, password, "createdAt", "updatedAt")
VALUES ('Admin User', 'admin@example.com', 'bcrypt_hashed_password', datetime('now'), datetime('now'));
```

#### Option 2: Using Node Script
Create a `seed.js` file in Backend root:

```javascript
const { User } = require('./src/models/user/User');
const { sequelize } = require('./src/database/index');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    await sequelize.sync();
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword
    });
    
    console.log('Admin user created successfully:', admin.toJSON());
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
```

Then run:
```bash
node seed.js
```

### Login Credentials
- **Email:** admin@example.com
- **Password:** admin123

---

## 📚 API Endpoints

### Authentication Endpoints
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/register` - Register new user

### Product Endpoints
- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `GET /api/product/categories/:name` - Get products by category
- `POST /api/product/upload` - Add product with image (multipart)
- `PUT /api/product/:id` - Update product
- `DELETE /api/product/:id` - Delete product

### User Endpoints (Protected)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

---

## 🗄️ Database Structure

### SQLite Database: `database.sqlite`

#### Users Table
```sql
CREATE TABLE "Users" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT,
  otp TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Categories Table
```sql
CREATE TABLE "categories" (
  categoryId INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Products Table
```sql
CREATE TABLE "products" (
  productId INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT NOT NULL,
  product_code TEXT NOT NULL,
  product_description TEXT,
  product_price DECIMAL,
  product_stock INTEGER,
  categoryId INTEGER,
  imageId INTEGER,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES categories(categoryId),
  FOREIGN KEY (imageId) REFERENCES Images(id)
);
```

#### Images Table
```sql
CREATE TABLE "Images" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  path TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📝 File Structure

```
KalaBazzer/
├── Backend/
│   ├── src/
│   │   ├── controller/
│   │   │   ├── auth/
│   │   │   ├── product/
│   │   │   └── user/
│   │   ├── models/
│   │   ├── route/
│   │   ├── middleware/
│   │   ├── security/
│   │   ├── database/
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── Admin/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   ├── apiClient.js (API configuration)
│   │   │   ├── authApi.js (Authentication)
│   │   │   ├── productApi.js (Products)
│   │   │   ├── orderApi.js (Orders)
│   │   │   └── inventoryApi.js (Inventory)
│   │   ├── core/
│   │   │   ├── public/
│   │   │   │   └── Adminlogin.jsx
│   │   │   └── private/
│   │   │       ├── dashboard.jsx
│   │   │       ├── Product.jsx
│   │   │       ├── Order.jsx
│   │   │       └── Inventory.jsx
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
└── Client/
    ├── src/
    ├── .env
    └── package.json
```

---

## 🚀 Running Everything Together

### Terminal 1: Run Backend
```bash
cd Backend
npm run dev
```

### Terminal 2: Run Admin Dashboard
```bash
cd Admin
npm run dev
```

### Terminal 3: Run Client (Optional)
```bash
cd Client
npm run dev
```

---

## 🐛 Troubleshooting

### 1. CORS Errors
- Make sure Backend is running on port 4000
- Check `.env` CORS_ORIGIN includes your frontend URLs
- Restart the backend server after changing CORS settings

### 2. Database Connection Errors
- Delete `database.sqlite` and restart backend (it will recreate)
- Check write permissions in Backend directory
- Ensure SQLite3 is installed

### 3. Authentication Errors
- Make sure you have created an admin user (see section above)
- Check password is correctly hashed with bcrypt
- Clear browser localStorage and try again: `localStorage.clear()`

### 4. Images Not Uploading
- Check `Backend/uploads/` directory exists and is writable
- Verify file size is under 5MB (MAX_FILE_SIZE in .env)
- Ensure formData includes the image file correctly

### 5. API Not Responding
- Check all servers are running on correct ports (4000, 5173, 5174)
- Look at backend console for error messages
- Check Network tab in browser DevTools for API calls

---

## 📞 Support

For issues or questions, check the backend console logs and browser DevTools Network tab for detailed error messages.

---

## ✨ Next Steps

1. ✅ Backend running with SQLite database
2. ✅ Admin dashboard connected with API
3. ✅ Authentication flow implemented
4. ✅ Product management endpoints ready
5. 📋 Add Order management endpoints (if needed)
6. 📋 Add Inventory management endpoints (if needed)
7. 📋 Add User management endpoints (if needed)

Good luck with KalaBazzer! 🎉
