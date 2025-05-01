## School Management API

A Node.js + Express.js RESTful API that manages school data and supports proximity-based listing using MySQL as the database.

## 🚀 Project Objective

To implement a backend system with the following capabilities:
- Add a new school with geolocation data
- Retrieve a list of all schools sorted by proximity to the user's location

## ⚙️ Tech Stack

- Node.js
- Express.js
- MySQL (hosted on Aiven.io,free tier)
- Render (for deployment,free tier)
- Postman (for API testing)

---

## 📦 API Features

 1. Add School

- **Endpoint**: `POST /addSchool`
- **Description**: Adds a new school with latitude and longitude
- **Request Body** (JSON):
```json
{
  "name": "Green Valley High",
  "address": "123 School Street",
  "latitude": 12.9352,
  "longitude": 77.6144
}
```
 Example:
```
POST /addSchool
```
2. List Schools by Proximity

- **Endpoint**: `GET /listSchools`
- **Description**: Returns a sorted list of schools by closest distance to provided coordinates.  
- **Query params**:
 
        latitude

        longitude

    Example:
```
GET /listSchools?latitude=12.97&longitude=77.59
```

## 🌐 Live API Deployment

Hosted on Render:

    🔗 https://school-management-je4q.onrender.com

## 🗂️ Project Structure

The codebase is organized in a single file for simplicity:

school-management-api/
├── index.js         # Main server file with both endpoints
├── .env             # Local environment variables (not committed)
├── .gitignore       # Ignores node_modules and .env
├── package.json
└── README.md

## 🛠️ Setup Instructions
🔧 Local Development

   Clone the repo:
```
git clone https://github.com/hemanand24/School-Management.git
cd School-Management
```
  Create a .env file (not tracked by Git):
```
DB_HOST=your-db-host
DB_PORT=your-db-port
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
PORT=3000
```
  Install dependencies:
```
npm install
```
  Run the server:
```
node index.js
```
   Deployment Steps:

  -Push code to GitHub (exclude .env)

  -Deploy the repository on Render(free tier)

  -Set environment variables manually in Render:

      DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME

## 🧪 Postman Collection

   Includes example requests for both APIs

    📥 Postman Collection (https://www.postman.com/hemanandj/workspace/hemanand-j/collection/44506736-2f3a805c-5254-48af-bae9-c49e577c51b5?action=share&creator=44506736)


## 🔐 Security Note

.env file is excluded from the repo to avoid exposing credentials. Make sure to manually configure these secrets in your hosting environment (like Render).


## ✅ Final Deliverables

-Source code repository with clean commit history

-Live API endpoints accessible for testing(hosted in render, because of free tier goes to sleep incase of inactivity)

-Postman collection shared with stakeholders



👨‍💻 Author

Hemanand J
Node.js — School Management API Project (April 2025)
