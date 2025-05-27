const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const app = express();
const port = 5000;

// Send Email Notification
function sendEmailNotification(subject, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rollergrind360@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'rollergrind360@gmail.com',
        to: 'ventasonline@rollergrind360.com',
        subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// Download file from URL
async function downloadFile(url, dest) {
    const writer = fs.createWriteStream(dest);
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    });

    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// Process CSV File
function processCSV(filePath) {
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Process the CSV data here
            console.log(results);
            // Example: Process each product
            results.forEach((row) => {
                const csvreference = "US-" + row.Reference;
                // Handle each row as needed
            });
        });
}

// Import file and process
app.get('/import', async (req, res) => {
    try {
        const url = 'https://csvshops.universkate.com/UniverskateStock.csv';
        const filePath = path.join(__dirname, 'universkate.csv');

        // Download file
        await downloadFile(url, filePath);
        
        // Process CSV
        processCSV(filePath);

        // Send email notification
        sendEmailNotification('Universkate Import Cron', 'Import completed successfully.');

        res.send('Import and email notification completed!');
    } catch (error) {
        console.error('Error during import:', error);
        res.status(500).send('Error during import.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
