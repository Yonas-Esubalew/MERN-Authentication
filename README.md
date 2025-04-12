# MERN Authentication System 🔐

A secure and full-featured **authentication system** built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). This project includes features like user registration, login, protected routes, JWT-based authentication, and role-based access (admin/user).

![Auth System Screenshot](https://github.com/Yonas-Esubalew/MERN-Chat-Application/blob/master/image_original%20(3).jpg?raw=true)

---

## 🚀 Features

- ✅ User Registration & Login
- ✅ Password Hashing with bcrypt
- ✅ JSON Web Token (JWT) Authentication
- ✅ Protected Routes (Frontend & Backend)
- ✅ Role-based Access Control (Admin/User)
- ✅ Profile Page & User Info Fetch
- ✅ Error Handling & Form Validation
- ✅ Logout & Token Expiry Handling
- ✅ Responsive UI (Mobile-Friendly)

---

## 🧰 Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

### Tools & Libraries
- JSON Web Token (JWT)
- bcrypt.js
- dotenv
- cors
- nodemon

---

## 📦 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/Yonas-Esubalew/mern-authentication-system.git
cd mern-authentication-system
🔧 Install Dependencies
bash
Copy
Edit
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
⚙️ Environment Variables
Create a .env file in the backend directory:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
✅ Do NOT commit your .env file — it's already in .gitignore for security.

💻 Running the App Locally
bash
Copy
Edit
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
Visit the app at: http://localhost:3000

🌐 Deployment
Frontend can be deployed on Vercel

Add environment variable: REACT_APP_API_URL=https://your-backend-url.up.railway.app

Make sure to use the REACT_APP_ or VITE_ prefix

Backend can be deployed using Railway

Connect your GitHub repo

Add MONGO_URI and JWT_SECRET to Railway environment

Ensure "start": "node server.js" is in your package.json

🔐 Usage
Register as a new user

Login and access protected routes

Admin can access admin-only pages

Logout clears JWT token and redirects to login

Refresh token handling is optional but can be added

🛠 Customization
Modify or extend roles (Admin, User, Editor)

Add social logins (Google, GitHub, etc.)

Connect it to a full project like ecommerce or a dashboard

Add email verification, reset password via email, etc.

🤝 Contributing
Fork the repo

Create a new branch: git checkout -b feature-name

Commit your changes: git commit -m 'Add feature'

Push to your fork: git push origin feature-name

Submit a Pull Request ✅

📢 Acknowledgements
React – https://reactjs.org

Express – https://expressjs.com

MongoDB – https://www.mongodb.com

JWT – https://jwt.io

Railway – https://railway.app

Vercel – https://vercel.com

👨‍💻 Author
Author: Yonas Esubalew

Email: yonasatwork999@gmail.com

Website: yonas-esubalew.vercel.app

🌍 Demo
Try the live demo here:
👉 https://mern-authentication-p3wx.onrender.com
