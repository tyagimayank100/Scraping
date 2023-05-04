const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stocksRouter = require('./routes/stocks');

const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/stocks', { useNewUrlParser: true, useUnifiedTopology: true });

// Enable CORS
app.use(cors());

// Set up the API routes
app.use('/stocks', stocksRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});



