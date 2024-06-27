const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { formData, tableHTML } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: process.env.YAHOO_USER,
            pass: process.env.YAHOO_PASS,
        },
    });

    const mailOptions = {
        from: process.env.YAHOO_USER,
        to: 'recipient@example.com', // Change to your recipient email
        subject: `Report for ${formData.eventName}`,
        html: tableHTML,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: error.toString() });
        }
        res.status(200).send({ message: 'Email sent: ' + info.response });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
