# Carpooling Project

## Overview
This project is a carpooling application designed to connect users who want to share rides. Follow the instructions below to set up and run the application on your local machine.

---

## Prerequisites
Before running the application, ensure you have the following installed:
- [Go](https://golang.org/) (version 1.20 or higher)
- [Git](https://git-scm.com/)
- Need to have Postgres installed

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Carpooling_Project/backend
```

### 2. Install Dependencies
Run the following command to install all required Go modules:
```bash
go mod tidy
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory and add the required environment variables. Refer to the example below:

Example:
```
DB_DSN=host=localhost user=yourusername password=yourpassword dbname=yourdbname port=5432 sslmode=disable
```

### 4. Set Up the Database
- Ensure your PostgreSQL server is running.
- The application will automatically migrate the database schema when started.

### 5. Start the Application
Run the following command to start the backend server:
```bash
go run main.go
```

The application should now be running at `http://localhost:8080`.

---

## API Endpoints
- `GET /rides` - Fetch all available rides.
- `POST /add` - Add a new ride.
- `GET /rides/filter` - Filter rides based on origin, destination, and date.

---

## Contribution Guidelines
- Fork the repository and create a new branch for your feature or bug fix.
- Follow the coding standards and include meaningful commit messages.
- Submit a pull request for review.

---

## Troubleshooting
If you encounter issues, check the following:
- Ensure all dependencies are installed correctly using `go mod tidy`.
- Verify your `.env` file is configured properly.
- Check the logs for error messages.

For further assistance, feel free to open an issue in the repository.

---

