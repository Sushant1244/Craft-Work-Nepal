# Craft-Work-Nepal (KalaBazzer)

Welcome to **Craft-Work-Nepal** (internally known as KalaBazzer), a complete full-stack ecommerce platform dedicated to online art and craft sales.

This project is divided into three main components:
- **Client Application**: The customer-facing storefront where users can browse products, add them to a cart, and complete orders.
- **Admin Panel**: A dedicated management dashboard for administrators to track sales, manage inventory, and update product catalogs.
- **Backend API**: The central Node.js/Express server backed by PostgreSQL, providing RESTful interfaces for both the Client and Admin applications.

## 🚀 Quick Start

To get the entire application running locally, check out the comprehensive **[Setup Guide (SETUP.md)](./SETUP.md)**.

Alternatively, you can use the provided quick start script (if running on a Unix-like environment):
```bash
bash quick-start.sh
```

## 📊 Project Structure

This monorepo contains the following workspace structure:

```text
Craft-Work-Nepal/
├── Backend/                 # Node.js/Express API and PostgreSQL database configuration
├── Admin/                   # React/Vite Administrative Dashboard
├── Client/                  # React/Vite Customer Storefront
├── SETUP.md                 # Detailed instructions on installing and running the app
├── TESTING.md               # Guide on how to run tests
├── CLIENT_SUMMARY.md        # Overview of the Client Application
└── quick-start.sh           # Helper script to initialize and start the environments
```

## ✨ Key Features

### For Customers (Client App)
- Browse a beautiful product catalog with intuitive category filtering
- Responsive shopping cart and checkout process
- Fully responsive design on all devices

### For Admins (Admin Panel)
- Secure login system and dashboard
- Full product management (CRUD)
- Order tracking and inventory management

### Backend
- RESTful API architecture powered by Node.js and Express
- Database management with Sequelize ORM (PostgreSQL)
- Secure JWT authentication

## 🎨 Design

The application utilizes a consistent Crafter's color palette:
- **Primary Dark**: `#6B4423` (Deep Brown)
- **Primary Medium**: `#8B5A3C` (Medium Brown)
- **Primary Light**: `#D4A574` (Tan/Beige)
- **Accent Cream**: `#F5F1E8` (Off-white)

## 📞 Support and Documentation

For detailed information on each component, refer to their individual READMEs:
- `Backend/README.md`
- `Admin/README.md`
- `Client/README.md`

Made with ❤️ for CraftWork Nepal.
