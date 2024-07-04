// models/submissions.js

const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;

