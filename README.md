# 🛒 E-Commerce Mobile App with Admin Panel

![App Banner](https://i.ibb.co.com/xKQJQbL0/Whats-App-Image-2025-04-01-at-17-01-11-17efb921.jpg)

This is a cross-platform **E-Commerce Mobile Application** built using **React Native** and **Expo**. It offers a smooth shopping experience for customers and includes a feature-rich **Admin Panel** for managing products, orders, inventory, and users. Available for both **Android** and **iOS** platforms.

---

## 🚀 Features

### 👤 Customer App

- **User System**
  - Login/Register using **JWT Authentication**
  - **Google Login** (via Expo Google Auth)
  - Profile Management (Edit/Delete)
  - Address Book (Max 5 addresses per user)

- **Shopping Experience**
  - Internet connectivity check on app startup
  - Product Browsing with Variants (RAM, ROM, Size, Color)
  - Category Hierarchy (Main Categories and Sub-Categories)
  - Stock-aware UI (Disables buttons when stock is 0)
  - Product Details with Bottom Sheets (Warranty, Specifications)

- **Order System**
  - Cart Functionality
  - Token-Protected Checkout Process
  - Order History with Details and Status Tracking

---

### 🔐 Admin Panel

- Full Product Management (CRUD)
- Order Management and Processing System
- User Management with Role-Based Access
- Inventory Control
- Sales & Analytics Dashboard

---

### 💳 Payment Gateway Integration

- 🔐 **SSLCommerz**
- 💰 **bKash**
- 📱 **Nagad**
- 💳 **Card Payments** (Visa, MasterCard, Amex, etc.)
- 🌐 **50+ Global Payment Gateways** (via integrations like Stripe, PayPal, SSLC)
- 📦 **Cash on Delivery (COD)**
- ✅ **Auto Payment Handling**
  - Real-time payment verification
  - Transaction status updates
  - Sandbox & Live environment switching

---

## ⚙️ Technical Stack

### Core Technologies

- **Framework**: React Native (Expo)
- **Routing**: Expo File-Based Routing
- **State Management**: Redux Toolkit + RTK Query
- **UI Library**: React Native Paper + Custom Components

### Backend Integration

- **API**: RESTful Services with JWT Authentication
- **OAuth**: Google Login Integration via Expo
- **Data Fetching**: RTK Query for Optimized Caching & Auto Re-fetch
- **Admin Authentication**: Protected Routes with Role Validation

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/kazinayeem/ecommerce-app-myshop.git
cd ecommerce-app-myshop

# 2. Install dependencies
yarn install     # or npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and fill in your values (API_URL, Google Client ID, Payment Keys, etc.)

# 4. Run the app
expo start       # or npm start
