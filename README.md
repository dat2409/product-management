# Product Management Application

## Introduction

This project is a web application for managing a list of products. It provides functionalities to Create, Read, Update, and Delete (CRUD) products. Users can view a list of products, add new products through a modal form, edit existing product details, and remove products from the list.

The application is built with:
- **Backend:** Laravel (PHP Framework)
- **Frontend:** HTML, CSS, jQuery
- **Database:** PostgreSQL

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- PHP (>= 8.1 recommended, check your Laravel version's requirements)
- Composer (PHP dependency manager)
- Node.js
- A database server:
    - PostgreSQL (version 12 or higher recommended)
- Git

## Setup Instructions

Follow these steps to get your development environment set up and running.

### 1. Install PHP Dependencies:
```
composer install
```

### 2. Create Environment File:
Copy the example environment file and then generate your application key.
```
cp .env.example .env
php artisan key:generate
```

### 3. Configure Environment Variables
Ensure you have created the database in your PostgreSQL.

### 4. Run Database Migrations:
This will create the necessary tables in your database.

```
php artisan migrate
```

### 5.(Optional) Seed the Database:
```
php artisan db:seed
```

### 6. Running the Application
Start the Laravel Development Server:

```
php artisan serve
```

This will start the application on http://127.0.0.1:8000 or http://localhost:8000. The terminal will show the exact address.

Access to http://127.0.0.1:8000/index.html or http://localhost:8000/index.html to perform the action.
