import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.SECRET_KEY;


cloudinary.config({ 
  cloud_name: 'dbztb7wzq', 
  api_key: '868667515988417', 
  api_secret: 'y9S2ipJCaLIV52IQ6lFQQtdipk8' // Click 'View Credentials' below to copy your API secret
});

app.use(fileUpload({
  useTempFiles: true,
  tempFilePath: '/tmp/'
}));



// Allow requests from your client origin
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,  // Make sure this matches your client URL exactly
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());



mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Mongodb is connected on port ${PORT}`))
  .catch((err) => console.error('Mongodb connection error', err));

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    points: Number,
    isAdmin: Boolean,
    membership_id: Number,
    dob:Date, 
    gender: { type: String, enum: ['male', 'female', 'non-binary', 'other'], default: 'other' }, 
    phone:String,
  });

const User = mongoose.model('User', userSchema);

app.get('/', async (req, res) => {
  // This is the admin dashboard route
  res.json('Welcome to the  dashboard!');
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const file = req.files && req.files.file;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const options = {
      folder: "profile_images",
      quality: 90,
      resource_type: "auto",
    };

    const response = await cloudinary.uploader.upload(file.tempFilePath, options);

    const isAdminUser = name === 'admin';

    const newUser = new User({
      name,
      email,
      password,
      image: response.secure_url,
      points: 100,
      isAdmin: isAdminUser ? true : false,
      membership_id :0,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/me', async (req, res,next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
  } catch (error) {
    console.error('Error during user retrieval', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  return next()
});

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
    // const refreshtoken = jwt.sign({ username: User.name }, 'SECRET_KEY', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    // res.cookie('refreshtoken', refreshtoken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ message: "Login successful", token,username:user.name,email:user.email ,points :user.points,Login:true });
     } 
    }
catch (error) {
    console.error('Error during login', error)
    res.status(500).json({ error: "inter server error" })
  }
})

//all user code 
app.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//find one particular user 
app.get('/getalluser/:email', async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});


app.put('/updateuser/:email', async (req, res) => {
  const email = req.params.email;
  const { points: userPoints, addPoints, membership_id, dob, gender, image, phone } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Validate fields
    if (typeof userPoints !== 'number' || isNaN(userPoints)) {
      return res.status(400).json({ error: 'Invalid userPoints value' });
    }
    if (typeof addPoints !== 'number' || isNaN(addPoints) || addPoints < 0) {
      return res.status(400).json({ error: 'Invalid addPoints value' });
    }
    if (typeof membership_id !== 'number' || isNaN(membership_id)) {
      return res.status(400).json({ error: 'Invalid membership_id value' });
    }
    if (dob && isNaN(new Date(dob).getTime())) {
      return res.status(400).json({ error: 'Invalid date of birth value' });
    }
    if (gender && typeof gender !== 'string') {
      return res.status(400).json({ error: 'Invalid gender value' });
    }
    if (image && typeof image !== 'string') {
      return res.status(400).json({ error: 'Invalid image URL value' });
    }
    if (phone && typeof phone !== 'string') {
      return res.status(400).json({ error: 'Invalid phone number value' });
    }

    // Validate points based on membership_id
    let errorResponse;
    if (membership_id === 1 && userPoints < 10) {
      errorResponse = { error: 'User must have at least 10 points for membership ID 1' };
    } else if (membership_id === 2 && userPoints < 20) {
      errorResponse = { error: 'User must have at least 20 points for membership ID 2' };
    } else if (membership_id === 3 && userPoints < 30) {
      errorResponse = { error: 'User must have at least 30 points for membership ID 3' };
    }

    if (errorResponse) {
      return res.status(400).json(errorResponse);
    }

    // Check admin user
    const adminUser = await User.findOne({ name: 'admin' });
    if (!adminUser) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    // Update points and membership ID
    adminUser.points += addPoints;
    await adminUser.save();

    user.membership_id = membership_id;
    user.points += addPoints;
    if (dob) user.dob = dob; // Update date of birth if provided
    if (gender) user.gender = gender; // Update gender if provided
    if (image) user.image = image; // Update image URL if provided
    if (phone) user.phone = phone; // Update phone number if provided
    const updatedUser = await user.save();

    res.json({ user: updatedUser, admin: adminUser });

  } catch (error) {
    console.error('Internal server error:', error); // Detailed error log
    res.status(500).json({ error: 'Internal server error' });
  }
});



const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', donationSchema);

//donate code 
app.put('/donate/:username', async (req, res) => {
  const username = req.params.username;
  const updatedPoints = req.body.points;
  const {addPoints} =req.body;

  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (addPoints <0) {
      return res.status(400).json({ error: 'Invalid amount, please enter a valid number' });
    }
    if (user.points < addPoints) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }else{
      await new Donation({
        userId: user._id,
        amount: addPoints,
      }).save();
    
     const adminUser = await User.findOne({ name: 'admin' });
      adminUser.points = adminUser.points + Number(addPoints);
      await adminUser.save();
      
    user.points = updatedPoints;
    const updatedUser = await user.save();
    res.json({user: updatedUser,admin:adminUser});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/total-donations', async (req, res) => {
  try {
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({ total: totalDonations.length > 0 ? totalDonations[0].total : 0 });
  } catch (error) {
    console.error('Error fetching total donations:', error);
    res.status(500).json({ error: 'Unable to fetch total donations' });
  }
});


app.get('/user-donations', async (req, res) => {
  try {
    // Aggregate donations grouped by user
    const userDonations = await Donation.aggregate([
      { 
        $group: {
          _id: '$userId', // Group by userId
          totalDonations: { $sum: '$amount' } // Calculate total donations for each user
        }
      },
      {
        $lookup: {
          from: 'users', // Name of the collection for User model
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' }, // Unwind the user array to get individual user documents
      {
        $project: {
          _id: 0, // Exclude the _id field
          username: '$user.name', // Include username
          totalDonations: 1 // Include total donations
        }
      }
    ]);

    res.json({ userDonations });
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(500).json({ error: 'Unable to fetch user donations' });
  }
});




//cancel membership 
app.post('/cancel', async (req, res) => {
  const { userId } = req.body;

  try {
    // Update the user's document in MongoDB
    await User.updateOne({ name: userId }, { $unset: { membership_id: "" } });
    res.status(200).json({ message: 'Membership cancelled successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling membership.', error });
  }
});


app.post('/quizPoints', async (req, res) => {
  const { userId } = req.body;
  const {addPoints}=req.body;
  try {
    const user = await User.findOne({ name: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
      
    user.points = user.points+Number(addPoints);
    const updatedUser = await user.save();
    res.json({user: updatedUser});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Events
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  image: { type: String },
  venue: { type: String, required: true },
  duration: { type: String, required: true },
  mode: { type: String, required: true, enum: ['online', 'offline'] },
});

const Event = mongoose.model('Event', eventSchema);

// Event routes
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/events', async (req, res) => {
  const { title, description, date, time, venue, duration, mode } = req.body;
  const file = req.files && req.files.file;

  if (!title || !description || !date || !time || !venue || !duration || !mode ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const options = {
    folder: "events",
    quality: 90,
    resource_type: "auto",
  };

  try {
    const response = await cloudinary.uploader.upload(file.tempFilePath, options);

    const newEvent = new Event({ 
      title, 
      description, 
      date, 
      time, 
      image: response.secure_url,
      venue, 
      duration, 
      mode 
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/events/:id', async (req, res) => {
  const { title, description, date, time, image, venue, duration, mode } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, time, image, venue, duration, mode },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Stories
const storySchema = new mongoose.Schema({
  username: String,
  story: String,
  date: { type: Date, default: Date.now }
});

const Story = mongoose.model('Story', storySchema);

// Endpoint to get all stories
app.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ date: -1 }); // Sorting by date descending
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to add a new story
app.post('/stories', async (req, res) => {
  const { username, story } = req.body;
  try {
    const newStory = new Story({ username, story });
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    console.error('Error adding story:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// POST Route to Save Inquiries
app.post('/api/inquiries', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newInquiry = new Inquiry({
      name,
      email,
      message,
    });

    await newInquiry.save();
    console.log('Inquiry received and stored:', { name, email, message });
    res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

app.get('/admin/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 }); // Fetch all inquiries, newest first
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Unable to fetch inquiries' });
  }
});

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  eventName: { type: String, required: true }, // Add this line
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }
});

const Registration = mongoose.model('Registration', registrationSchema);

app.post('/api/eventRegister', async (req, res) => {
  const { eventId, eventName, name, email, phone } = req.body;

  if (!eventId || !eventName || !name || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newRegistration = new Registration({
      eventId,
      eventName, // Save event name
      name,
      email,
      phone,
    });

    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ error: 'Failed to register' });
  }
});

//news 

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL to the image
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model('News', newsSchema);


app.post('/news', async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ error: 'Error creating news' });
  }
});

// Get all news items
app.get('/news', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
});

// Update a news item
app.put('/news/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: 'Error updating news' });
  }
});

// Delete a news item
app.delete('/news/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting news' });
  }
});



app.listen(PORT);
