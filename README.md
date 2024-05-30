# Real-Time Bidding Platform RESTful API

## Overview:

This project aims to create a comprehensive RESTful API for a real-time bidding platform using Node.js, Express, Socket.io, and a SQL database. The API supports advanced CRUD operations, user authentication, role-based access control, real-time bidding, and notifications.

## Setup Instructions:

1. Clone the Repository:
   git clone [repository-url]
   cd [project-folder]

2. Install Dependencies:
   npm install express socket.io pg dotenv multer cors

3. Set Environment Variables:
   DB_HOST = "YOUR_HOST";
   DB_USER = "YOUR_USER"
   DB_NAME = "YOUR_DB_NAME"
   DB_PASSWORD = "YOUR_PASSWORD"  
   PORT = 3000
   JWT_SECRET = "YOUR_JWT_SECRET"

4. Start the Application:
   Use command : npm run dev
   Test command : npm test

## API Endpoints:

## Users:

    POST /users/register: Register a new user.
    POST /users/login: Authenticate a user and return a token.
    GET /users/profile: Get the profile of the logged-in user.

## Items:

    GET /items: Retrieve all auction items (with pagination).
    GET /items/:id: Retrieve a single auction item by ID.
    POST /items: Create a new auction item. (Authenticated users, image upload)
    PUT /items/:id: Update an auction item by ID. (Authenticated users, only item owners or admins)
    DELETE /items/:id: Delete an auction item by ID. (Authenticated users, only item owners or admins)

## Bids:

    GET /items/:itemId/bids: Retrieve all bids for a specific item.
    POST /items/:itemId/bids: Place a new bid on a specific item. (Authenticated users)

## WebSocket Events:

## Bidding:

## connection: Establish a new WebSocket connection.

## bid: Place a new bid on an item.

## update: Notify all connected clients about a new bid on an item.

## Notifications:

## notify: Send notifications to users in real-time.

## Testing:

    Unit and integration tests for the API are included using [testing framework].s

## Features

- User authentication (register, login)
- Create, read, update, and delete auction items
- Place bids on items
- Real-time updates on bid status
- User profiles

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- Socket.io (for real-time updates)
- Multer (for file uploads)
- Jest (for testing)

real-time-bidding-api/
├── config/ # Database and other configurations
├── controllers/ # API logic for endpoints
├── middlewares/ # Authentication, authorization, etc.
├── models/ # Database models
├── public/ # client.js and index.js for WebSocket communication
├── routes/ # API endpoint definitions
├── services/ # Business logic (e.g., bidding)
├── tests/ # Used to testing
├── app.js # Main application file
├── server.js # Server configuration
├── .env # Environment variables
├── README.md # Project documentation
