# 🎬 Media Platform Backend


> A production-ready backend for a modern media & social platform — inspired by YouTube, Instagram & Twitter-style interactions.

This repository contains a **Node.js + Express backend** that powers a media-centric social platform.  
It supports **video uploads, tweets, comments, likes, views, subscriptions, authentication, and creator analytics**, built with scalability, security, and clean architecture in mind.

---

## 🚀 Features at a Glance

- 🔐 JWT Authentication (Access + Refresh Tokens)
- 👤 User & Channel Management
- 🎥 Video Upload & Publishing (Cloudinary)
- 👀 Atomic Video View Counting
- ❤️ Unified Like System (Videos, Comments, Tweets)
- 💬 Comment System
- 🐦 Tweet-style Short Posts
- 🔔 Channel Subscriptions
- 📊 Creator Dashboard & Channel Statistics
- ⚙️ MongoDB Aggregations for Analytics
- 🧱 Clean MVC + Feature-based Architecture

---

## 🧠 System Architecture



**Repository Structure (tree)**

```text
srcc/
├── app.js                # Express app & route mounting
├── index.js              # Server bootstrap & DB connection
├── db/
│   └── index.js          # MongoDB connection helper
├── models/               # Mongoose models
│   ├── user.model.js
│   ├── video.model.js
│   ├── comment.model.js
│   ├── like.model.js
│   ├── subscription.model.js
│   ├── tweet.model.js
│   └── playlist.model.js
├── controllers/          # Business logic
├── routes/               # API routes
├── middlewares/          # Auth & upload middleware
├── utils/                # Helpers (ApiError, ApiResponse, asyncHandler)
└── constants.js

public/
└── temp/                 # Temporary file storage (multer)
```

## 🔑 Authentication Flow

1. **Register**
   - User signs up with avatar / cover image
   - Password hashed using bcrypt

2. **Login**
   - Access + Refresh tokens generated
   - Tokens sent via HTTP-only cookies

3. **Access Protected Routes**
   - Access token verified via middleware

4. **Refresh Token**
   - New access token issued using refresh token

5. **Logout**
   - Refresh token removed from DB
   - Cookies cleared

---

## 📦 Core API Modules

### 👤 Users (`/api/v1/users`)
- Register / Login / Logout
- Refresh tokens
- Fetch current user
- Update avatar & cover image
- View channel profile

### 🎥 Videos (`/api/v1/videos`)
- Upload & publish videos
- Fetch videos (pagination & search)
- Increment views on watch
- Update / delete videos
- Toggle publish status

### 💬 Comments (`/api/v1/comments`)
- Add comment to a video
- Update / delete own comments
- Fetch comments for a video

### ❤️ Likes (`/api/v1/likes`)
- Toggle like on:
  - Videos
  - Comments
  - Tweets
- Fetch liked videos of user

### 🐦 Tweets (`/api/v1/tweets`)
- Create tweet
- Fetch user tweets
- Update / delete tweet

### 🔔 Subscriptions (`/api/v1/subscriptions`)
- Subscribe / unsubscribe to channel
- Fetch channel subscribers
- Fetch user subscriptions

### 📊 Dashboard (`/api/v1/dashboard`)
- Channel statistics
- Creator video list

---

## 🗄 Database Models Overview

### User
- username, email, password
- avatar, coverImage
- refreshToken
- watchHistory

### Video
- videoFile (Cloudinary URL)
- thumbnail
- title, description
- duration
- views
- isPublished
- owner

### Like
- video / comment / tweet
- likedBy

### Comment
- content
- video
- owner

### Subscription
- subscriber
- channel

---

## 👀 Views Logic

- Views are stored directly on the **Video** model
- Incremented atomically using `$inc`
- Prevents race conditions

```js
## Quick Design Notes & Setup

```js
{ $inc: { views: 1 } }
```

❤️ Like System Design

- Likes are stored as separate documents (`Like` collection).
- One like per user per entity (video/comment/tweet).
- Toggle behavior implemented via `findOneAndDelete` and `create` if not exists.

🌱 Environment Variables (create `.env` in repo root)

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017
ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=http://localhost:3000
```

⚙️ Installation & Setup

```bash
npm install
npm run dev
```

- Server runs on http://localhost:8000
- MongoDB must be running locally or remotely
- Cloudinary credentials required for uploads

🧪 Development Practices

- Feature-based folder organization
- Centralized error handling (recommended)
- Consistent API responses via `ApiResponse`
- Async error safety via `asyncHandler` wrapper
- Secure authentication flow with access + refresh tokens

🚧 Future Enhancements

- Channel analytics (monthly growth)
- Watch-time based views
- Redis-based counters for high-performance metrics
- Rate limiting and request throttling
- Request validation (e.g., Joi / express-validator)
- Swagger / OpenAPI docs
- Automated tests & CI pipeline

📌 Final Note

This backend is designed to be scalable, readable, and production-ready. It can serve as the foundation for a full-fledged media platform or as a strong portfolio project.

⭐ If you found this useful, consider starring the repository!
