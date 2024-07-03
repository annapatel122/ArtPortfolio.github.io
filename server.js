const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Submission = require('./models/Submission'); // Ensure this path is correct

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/art-portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., CSS, images)
app.use(express.static('public'));

// Handling form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const newSubmission = new Submission({
        name,
        email,
        message
    });

    newSubmission.save((err) => {
        if (err) {
            return res.status(500).send('Error saving submission: ' + err);
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        const mailOptions = {
            from: email,
            to: 'your-email@gmail.com',
            subject: `Message from ${name}`,
            text: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Error sending email: ' + error);
            }
            res.send('Email sent successfully!');
        });
    });
});

// Route to display submissions
app.get('/submissions', (req, res) => {
    Submission.find({}, (err, submissions) => {
        if (err) {
            return res.status(500).send('Error retrieving submissions: ' + err);
        }
        res.json(submissions); // Return submissions as JSON
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
