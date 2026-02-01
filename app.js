const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

const dataPath = './data/messages.json';

app.get('/api/daily-message', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading data");
            return;
        }
        const messages = JSON.parse(data);
        const randomIndex = Math.floor(Math.random() * messages.length);
        res.json(messages[randomIndex]);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});