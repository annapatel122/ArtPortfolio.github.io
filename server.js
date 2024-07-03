// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Submission = require('./models/submission'); // Adjust path as necessary

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/artportfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Example API endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// POST endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    const newSubmission = new Submission({
        name,
        email,
        message
    });

    newSubmission.save()
        .then(() => {
            res.send('Form submitted successfully');
        })
        .catch(err => {
            console.error('Error saving submission:', err);
            res.status(500).send('Error saving submission');
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


