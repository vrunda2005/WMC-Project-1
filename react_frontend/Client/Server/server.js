const express = require('express')
const mongoose = require('mongoose')
const PORT = 5000
const cors = require('cors')
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
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const newUser = new User({
      name,
      email,
      password
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
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error('Error during login', error)
    res.status(500).json({ error: "inter server error" })
  }
})

app.listen(PORT);