Website with Sign-up/Login and Category Selection
This project implements a simple sign-up and login flow for an e-commerce website, allowing users to mark their interested categories. It consists of registration, login, and a protected page where users can select categories they are interested in. The data is stored in a PostgreSQL database, and the frontend is built using Next.js with JWT authentication and Bcrypt for password hashing.

Features:
User registration with email and password
User login with email and password
Authentication using JWT tokens
Protected page accessible only to logged-in users
Paginated list of categories for selection
Data persistence of selected categories across sessions

Tech Stack:
Database: PostgreSQL
Frontend Framework: Next.js
Authentication: JWT
Password Hashing: Bcrypt
Installation and Setup:
Clone the repository:
bash
Copy code
git clone https://github.com/kunalborkar2001/TurnOverBiz-Assessment/
Install dependencies:
Copy code
npm install

Set up environment variables:
Create a .env file based on the provided .env.example and configure database credentials.
PORT =
SERVER_EMAIL =
SERVER_PASSWORD =
SEQUELIZE_URL =

Run the development server:
arduino
Copy code
npm run dev

Live Demo:
https://turn-over-biz-assessment-pzd2.vercel.app/

GitHub Repository:
The codebase is available on GitHub at https://github.com/kunalborkar2001/TurnOverBiz-Assessment/

