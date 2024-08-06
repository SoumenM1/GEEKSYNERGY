const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files from the "public" directory
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', userRoutes);

// Define routes to render views
app.get('/', (req, res) => {
  res.render('register'); // Renders views/index.ejs
});

app.get('/login', (req, res) => {
  res.render('login'); // Renders views/login.ejs
});

app.get('/home', (req, res) => {
  res.render('index'); // Renders views/register.ejs
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
