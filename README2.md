# Backend Project - Code-Based Explanation

## 1️⃣ Project Architecture Overview

### Files Interaction
- `src/index.js` main entry point hai, jo `dotenv` load karta hai, `app` import karta hai from `app.js`, aur `connectDB` from `db/index.js` call karta hai.
- `app.js` Express app banata hai aur middleware set karta hai.
- `db/index.js` MongoDB connect karta hai using mongoose.
- Utils files (`apierror.js`, `apiresponce.js`, `asyncHandler.js`) error aur response handling ke liye hain.
- `content.js` constants provide karta hai.

### Request → Response Flow
1. Request aati hai server pe.
2. `src/index.js` me app.listen chal raha hai.
3. Request `app.js` ke middleware se guzarti hai: cors, express.json, cookieParser.
4. Agar routes define hote (abhi empty), to wahan jaati.
5. Response bheji jati hai, lekin abhi koi route nahi, so 404.

Actual code me routes empty hain, so sirf middleware chain hai.

## 2️⃣ File-by-File Explanation

### package.json
- Purpose: Project metadata aur dependencies define karta hai.
- Key: `"type": "module"` ES modules enable karta hai.
- Scripts: `"dev": "nodemon src/index.js"` development ke liye.
- Dependencies: express, mongoose, etc. import kiye gaye hain code me.
- Break if remove: npm install nahi chalega, imports fail.
- Does NOT handle: Code logic, sirf setup.

### src/index.js
- Purpose: Server start aur DB connect.
- Key: dotenv.config() call, connectDB().then() me app.listen.
- Logic: DB connect success pe server start, error pe catch.
- Approach: Async/await use, promise chaining.
- Break if remove: Server nahi start hoga.
- Does NOT handle: Routes, middleware, business logic.

### src/app.js
- Purpose: Express app configure.
- Key: express() instance, app.use(cors), app.use(express.json), app.use(cookieParser).
- Logic: Middleware chain set.
- Approach: Modular setup.
- Break if remove: No app instance.
- Does NOT handle: DB, routes, server listen.

### src/db/index.js
- Purpose: MongoDB connection.
- Key: mongoose.connect() in try/catch.
- Logic: Connect, log success, error pe exit.
- Approach: Async function.
- Break if remove: DB nahi connect hoga.
- Does NOT handle: App setup, routes.

### src/content.js
- Purpose: Constants store.
- Key: export const DB_NAME.
- Logic: Sirf constant.
- Approach: Simple export.
- Break if remove: DB_NAME undefined.
- Does NOT handle: Logic, functions.

## 3️⃣ Utilities Deep Explanation

### apierror.js
- Error class extends Error.
- Constructor: statuscode, message, errors, stack set karta hai.
- Usage: Throw karne ke liye custom errors.
- Note: Typo "satuscode" hai, should be "statuscode".

### apiresponce.js
- Response class.
- Constructor: statuscode, data, message set.
- Usage: Consistent response format.
- Bug: this.statuscode=statuscode<400; galat hai, should be this.success = statuscode < 400;

### asyncHandler.js
- Higher order function.
- Wraps async fn, try/catch.
- Catches error, sends JSON response.
- Bug: res.status().join(" ").json() galat, should be .json().

## 4️⃣ app.js & index.js
- app.js: App configure, middleware.
- index.js: Bootstrap, DB connect, listen.
- Difference: app.js setup, index.js execution.
- Flow: index.js imports app, connects DB, then listen.

## 5️⃣ package.json & .env
- Scripts: dev nodemon use karta hai.
- Dependencies: Code me import kiye: express, mongoose, cors, etc.
- .env: process.env.PORT, MONGODB_URI, CORS_ORIGIN use hote hain.
