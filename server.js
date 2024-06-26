const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/api/send-report', async (req, res) => {
    const { formData, tableHTML } = req.body;

    // Create a Nodemailer transporter using Gmail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    // Email options
    let mailOptions = {
        from: process.env.GMAIL_USER,
        to: 'recipient1@example.com, recipient2@example.com', // Add your recipients here
        subject: `Inventory Report for ${formData.eventName}`,
        html: tableHTML
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Report sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send report.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
