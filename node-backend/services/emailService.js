const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Use environment variables for security
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send email
const sendEmail = async (email, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw error to handle it in the controller
    }
};

module.exports = { sendEmail };
