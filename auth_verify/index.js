const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/ todoRoutes')
dotenv.config();
app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {  
    res.send('Hello World!');
 });

 app.use(cors({
    origin: '*'
  }));
 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

    app.use('/api/auth', authRoutes);
    app.use('/api/todos', todoRoutes);

 app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
 });