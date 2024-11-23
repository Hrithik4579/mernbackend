import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cookieParser())

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,
// };
// const cors = require('cors');

// Dynamically set allowed origins
const allowedOrigins = [
  'https://frontendmern-jnyu.onrender.com', // Your deployed frontend
  'http://localhost:3000' // Optional: for local development
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // If your frontend and backend share cookies or auth headers
}));

// app.use(cors(corsOptions));

//routes import
import student from './routes/student.route.js'
import admin from './routes/admin.route.js'
import application from './routes/application.route.js'
import blog from './routes/blog.route.js'

//routes declaration

app.use("/api/students", student)
app.use("/api/admin", admin)
app.use("/api/applications", application)
app.use("/api/blogs", blog)

export { app }