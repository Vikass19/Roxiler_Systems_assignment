# Roxiler Systems Assignment

# Store Rating App

A full-stack web application that allows users to rate and review stores. The application includes secure authentication and role-based access control, providing separate dashboards and functionalities for users, store owners, and administrators.

---

## Project Overview

The Store Rating App is designed to simplify store rating and management through a role-based system. Users can browse and rate stores, store owners can monitor ratings and feedback, and administrators can manage the entire platform through a dedicated dashboard.

---

## Features

### Authentication & User Management

* User registration and login
* JWT-based authentication
* Secure password hashing using bcrypt
* Profile management and password updates
* Frontend and backend validation

### Role-Based Access

#### Normal User

* Browse available stores
* Submit and update store ratings
* Manage personal profile information

#### Store Owner

* View ratings and feedback for owned stores
* Monitor store performance through a dedicated dashboard

#### System Administrator

* Manage users, stores, and store owners
* Access platform-wide statistics
* Monitor overall application activity

### Additional Features

* Responsive user interface
* Protected routes and role-based authorization
* Modern and user-friendly design

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* CSS

### Backend

* Express.js
* Prisma ORM
* MySQL
* JWT Authentication
* bcrypt

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Vikass19/store_rating_app.git
cd store_rating_app
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Open a new terminal and run:

```bash
cd frontend
npm install
```

---

## Environment Variables

### Backend Configuration

Create a `.env` file inside the `backend` directory:

```env
# Server Configuration
PORT=5000
JWT_SECRET=your_jwt_secret

# Database Configuration
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=localhost

# Prisma Database URL
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

### Backend Notes

* Ensure MySQL is installed and running.
* Create the database before starting the application.
* Replace placeholder values with your local database credentials.


If your database password contains special characters, encode them in the connection string.

Example:

```text
# becomes %23
```

### Frontend Configuration

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

### Start the Frontend Application

Open a new terminal:

```bash
cd frontend
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Screenshots

| Screenshot                                                  | Description             |
| ----------------------------------------------------------- | ----------------------- |
| ![Login](imgs/login.png)                                    | Login Page              |
| ![Register](imgs/register.png)                              | Registration Page       |
| ![Dashboard](imgs/dashboard_view.png)                       | Dashboard Overview      |
| ![Store Owner](imgs/store_owner.png)                        | Store Owner Dashboard   |
| ![Admin Dashboard](imgs/system_administrator_dashboard.png) | Administrator Dashboard |
| ![User View](imgs/user_view.png)                            | User Dashboard          |

---

## Project Structure

```text
store_rating_app/
│
├── frontend/     # React frontend application
├── backend/      # Node.js and Express backend API

```

---

## Security

* Passwords are securely hashed using bcrypt.
* JWT tokens are used for authentication.
* Role-based authorization protects sensitive routes.
* Environment variables are used to store sensitive configuration values securely.

---

## Usage

1. Register a new account or log in.
2. Access features based on your assigned role.
3. Browse and rate stores as a user.
4. Monitor store ratings as a store owner.
5. Manage the platform as an administrator.

---

## Author

**Vikas Bansode**

GitHub: https://github.com/Vikass19
