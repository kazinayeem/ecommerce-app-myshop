# E-Commerce Mobile App with Admin Panel

![App Banner](https://i.ibb.co.com/xKQJQbL0/Whats-App-Image-2025-04-01-at-17-01-11-17efb921.jpg) <!-- Replace with actual banner -->

This is a cross-platform e-commerce mobile application built using React Native and Expo. The app is available for both Android and iOS and provides a seamless shopping experience for users. The app includes a comprehensive admin panel for managing products, orders, and users.

## Features

### Customer App

- **User System**

  - Login/Register with JWT authentication
  - Profile management (edit/delete)
  - Address management (max 5 addresses)

- **Shopping Experience**

  - Product browsing with variants (RAM/ROM/Size/Color)
  - Category hierarchy (main + sub-categories)
  - Stock-aware UI (disables buttons when stock=0)
  - Product details with bottom sheets (warranty/specs)

- **Order System**

  - Cart functionality
  - Token-protected checkout
  - Order history with details

- **Admin Panel**
  - Full product management (CRUD)
  - Order processing system
  - User management
  - Inventory control
  - Sales analytics

## Technical Stack

### Core

- **Framework**: React Native (Expo)
- **Routing**: Expo File-Based Routing
- **State**: Redux + RTK Query
- **UI**: React Native + Custom Components + React Native Paper

### Backend Integration

- **API**: RESTful services with JWT auth
- **Data Fetching**: RTK Query for optimized caching
- **Admin Auth**: Protected routes with role checks

## Installation

```bash
# 1. Clone repository
git clone https://github.com/kazinayeem/ecommerce-app-myshop.git
cd ecommerce-app-myshop

# 2. Install dependencies
yarn install or npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your values

# 4. Run the app
expo start or npm start

```
