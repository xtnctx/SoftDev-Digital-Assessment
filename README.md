# Todo App

A full-stack Todo application with authentication.

Backend: Node.js, Express, Drizzle ORM, PostgreSQL, JWT

Frontend: React, TypeScript, Tailwind CSS

## Prerequisites
- Node.js (v18+ recommended)

- PostgreSQL

- pnpm (npm install -g pnpm)

- Postman (for testing API)


## Backend Setup
1. Navigate to backend folder
```bash
cd backend
```
2. Install dependencies
```bash
pnpm install
```
3. Create .env file
```bash
DATABASE_URL=postgres://<username>:<password>@localhost:5432/todoapp
JWT_SECRET=***<YOUR_JWT_SECRET>****
PORT=4000
```
4. Start PostgreSQL
```bash
psql -U postgres
CREATE DATABASE todoapp;
```
5. Run migrations / push schema using Drizzle
```bash
pnpm db:push
```
6. Start the backend server
```bash
pnpm dev
```
7. Test API using Postman
- Register: POST /api/register
- Login: POST /api/login
- Todos (protected): GET/POST/DELETE/PATCH /api/todos

## Frontend Setup
1. Navigate to frontend folder
```bash
cd frontend
```
2. Install dependencies
```bash
pnpm install
```
3. Start frontend server
```bash
pnpm dev
```

### Frontend Features

- Login / Register: JWT saved in localStorage

- Todo Page (authenticated):

    Fetch all todos

    Add todo

    Delete todo

    Toggle todo done/undone

## Demo Video
https://www.loom.com/share/dd776f9c348a4bad842726b6e12801f5