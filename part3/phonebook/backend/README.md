# Phonebook Application - Backend

This is the backend for the Phonebook application built with Node.js and Express.

## 🚀 Online Application

The backend is deployed on Fly.io and can be accessed here:

- [Phonebook API - Online](https://yourphonebook.fly.dev/api/persons)

## 📌 Features

- RESTful API with CRUD operations for managing phonebook entries.
- JSON support and error handling with custom error messages.
- Request logging with Morgan.
- Cross-Origin Resource Sharing (CORS) enabled.

## ⚡ Usage

- Make HTTP requests to the API endpoints:
  - `GET /api/persons` - Get all contacts.
  - `POST /api/persons` - Add a new contact.
  - `DELETE /api/persons/:id` - Delete a contact.
  - `PUT /api/persons/:id` - Update a contact's details.

## 🚀 Technologies Used

- Node.js
- Express.js
- Morgan (Request logging)
- CORS (Cross-Origin Resource Sharing)
- Fly.io (Deployment)

## ⚙️ Development

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
