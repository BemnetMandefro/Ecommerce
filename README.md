# E-Commerce Store — Capstone Project

## Overview

This project is a responsive e-commerce web application built as a Frontend Development Capstone Project. It allows users to browse products, view product details, manage a shopping cart, register and log in, and complete a simulated checkout. It also includes an admin dashboard for managing store information.

## Features

### Customer Storefront
- Browse products from the EscuelaJS Fake Store API.
- View individual product details.
- Search and filter products.
- Add products to the shopping cart and manage quantities.
- View cart totals.
- Register and log in.
- Complete a simulated checkout with delivery information.
- View an order-success confirmation page.

### Admin Dashboard
- Access the admin dashboard.
- View and search products.
- Filter products by category.
- View product categories.
- View available user information.
- Access the product creation interface.

**Note:** Product editing and mutations to the shared demo API are limited to protect shared data. Checkout is simulated and does not process real payments or create real orders.

## Technologies Used

- Next.js with the App Router
- React
- TypeScript
- Tailwind CSS
- EscuelaJS Fake Store API
- Git and GitHub

## API

The application uses the EscuelaJS API:

`https://api.escuelajs.co/api/v1`

The API provides product, category, user, and authentication data.

## Getting Started

### Prerequisites

- Node.js and npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project folder:

   ```bash
   cd ecommerce
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root with the required environment variables:

   ```env
   NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
   ADMIN_EMAIL=your-admin-email@example.com
   ```

   Replace the example email with the email configured for admin access. Do not commit `.env.local` or expose credentials, passwords, or access tokens.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

### Production Build

To verify the production build, run:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── admin/
│   ├── api/
│   ├── cart/
│   ├── checkout/
│   ├── login/
│   ├── products/
│   └── register/
├── components/
├── context/
├── lib/
└── types/
```

## Important Notes

- Checkout is a demonstration flow, not a real payment system.
- The application depends on the availability of the external EscuelaJS API.
- Admin access requires the configured admin email and a valid authenticated session.
- Never commit private environment variables or credentials.

## Author

Frontend Development Capstone Project
