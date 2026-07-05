# Cross-Platform Dental Portal

A full-stack web application for a modern dental clinic, featuring a beautiful UI, interactive service listings, doctor profiles, and an appointment booking system.

## Project Structure

This project is separated into two standard directories:
- `frontend/` - React frontend built with Vite and TailwindCSS.
- `backend/` - Node.js Express API connected to a PostgreSQL database via Drizzle ORM.

## Setup Instructions

### 1. Database Setup
This project requires a PostgreSQL database. You can easily create a free one on [Supabase](https://supabase.com/) or [Neon](https://neon.tech/).
- Create a `.env` file in the `backend/` directory.
- Add your connection string: `DATABASE_URL=postgresql://user:password@host:port/dbname`
- Run `npm run push` in the backend directory to create the tables.
- Run `npx tsx src/db/seed.ts` in the backend directory to populate the database with dummy data.

### 2. Backend
Navigate to the `backend/` directory:
```bash
cd backend
npm install
npm run dev
```
The backend server will start on `http://localhost:5000`.

### 3. Frontend
Navigate to the `frontend/` directory in a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend Vite server will start on `http://localhost:5173`. 
*(Note: It automatically proxies `/api` requests to the backend server running on port 5000).*

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Radix UI, Lucide Icons.
- **Backend**: Node.js, Express 5.
- **Database**: PostgreSQL + Drizzle ORM.
- **Validation**: Zod.
