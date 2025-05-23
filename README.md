# 📚 Book Review API

A RESTful API built with Node.js, Express, and MongoDB that allows users to sign up, log in, and review books. Features include JWT authentication, pagination, filtering, and searching.

## 🛠️ Tech Stack

- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Postman** for testing APIs
- **Optional:** Deployed using Render / Railway

## 📦 Features

### ✅ Authentication
- `POST /signup` – Register a new user
- `POST /login` – Login and receive a JWT token

### ✅ Book Management
- `POST /books` – Add a book (Authenticated users only)
- `GET /books` – Get books with pagination and filtering by author and genre
- `GET /books/:id` – Get book details, including:
  - Average rating
  - Reviews with pagination
- `GET /search`  - Search books by title or author

### ✅ Review Management
- `POST /books/:id/reviews` – Submit a review (1 review per user per book)
- `PUT /reviews/:id` – Update your own review
- `DELETE /reviews/:id` – Delete your own review

### 🔍 Search
- `GET /search?q=harry` – Search by title or author (case-insensitive, partial match)

## 🧪 How to Run Locally

### 1. Clone the repo
```bash
git clone [https://github.com/your-username/book-review-api.git](https://github.com/Risheek2627/Book_Review_Api.git)
cd server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root:
```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=yourSecretKey
```

### 4. Start the server
```bash
npm start
```

## 🌐 API Testing (Postman)

### Example: Sign Up
```http
POST /signup
Content-Type: application/json

{
  "username": "risheek",
  "email": "risheek@example.com",
  "password": "password123"
}
```

### Example: Get Paginated Books
```http
GET /books?page=2&limit=5&genre=Sci-Fi&author=asimov
Authorization: Bearer <your-jwt-token>
```

### Example: Submit a Review
```http
POST /books/6624bfa73d9f/reviews
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Great book!"
}
```

## 🧱 Database Schema Overview

### 🧍 User
```javascript
{
  username: String,
  email: String,
  password: HashedString
}
```

### 📘 Book
```javascript
{
  title: String,
  author: String,
  genre: String,
  description: String,
  publishedYear: Number
}
```

### ⭐ Review
```javascript
{
  user: ObjectId,
  book: ObjectId,
  rating: Number,
  comment: String
}
```

## 📌 Assumptions

- A user can give only one review per book
- Search is case-insensitive and supports partial match
- JWT token must be sent in headers as `Authorization: Bearer <token>`




## 📧 Contact

If you have any questions or suggestions, feel free to reach out!

