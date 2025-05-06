# SpaceTech E-commerce

A modern e-commerce platform built with Next.js, MongoDB, and deployed on Vercel.

## Features

- Next.js 15 (App Router)
- MongoDB for database
- React 19
- TailwindCSS
- Admin dashboard for product management
- Mobile-responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment on Vercel

1. Create a MongoDB Atlas account and set up a cluster
2. Get your MongoDB connection string
3. Push your code to GitHub
4. Connect your repository to Vercel
5. Add `MONGODB_URI` as an environment variable in your Vercel project settings
6. Deploy!

## Admin Dashboard

Access the admin dashboard at `/admin/products` to manage your products.

## Project Structure

- `src/app` - Next.js app router pages
- `src/components` - Reusable React components
- `src/lib` - Utility functions and libraries
- `src/models` - MongoDB schemas using Mongoose
- `src/app/api` - API routes for backend functionality
