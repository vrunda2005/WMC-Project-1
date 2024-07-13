import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = 5000
const app = express()
const uri = "mongodb+srv://moinvinchhi:Database.mongodb@cluster0.crywp50.mongodb.net/WMC_user";

app.use(cors())
app.use(express.json())

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Mongodb is connected'))
.catch((err) => console.error('Mongodb connection error', err));

const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  points: Number,
  isAdmin:Boolean
});

const User = mongoose.model('User', userSchema);

app.get('/admin', async (req, res) => {
  // This is the admin dashboard route
  res.send('Welcome to the admin dashboard!');
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const isAdminUser=name ==='admin';
    const newUser = new User({
      name,
      email,
      password,
      points:100,
      isAdmin:isAdminUser?true:false
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    console.error('Error during registration', error)
    res.status(500).json({ error: "Inter server error" })
  }
})


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password!== password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    // Generate a token
    if (!process.env.SECRET_KEY) {
      console.error('SECRET_KEY environment variable is not set');
      process.exit(1); // Exit the process if SECRET_KEY is not set
    }

        // Check if the user is an admin
    if (user.isAdmin) { // assuming you have an isAdmin field in your user schema
       // Generate a token for the admin dashboard
      const adminToken = jwt.sign({ username: User.name, isAdmin: true }, 'SECRET_KEY', { expiresIn: '1h' });
      res.cookie('token', adminToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({ message: "Admin Login successful", token: adminToken, username: user.name, points: user.points, isAdmin: true });
      // Redirect to the admin dashboa
      // res.render('Admin'); // assuming you have an admin dashboard route

    }
    else{
    const token = jwt.sign({ username: User.name }, 'SECRET_KEY', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ message: "Login successful", token,username:user.name ,points :user.points });
     } 
    }
catch (error) {
    console.error('Error during login', error)
    res.status(500).json({ error: "inter server error" })
  }
})




app.listen(PORT);