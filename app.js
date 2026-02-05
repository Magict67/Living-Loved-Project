const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
const dataPath = './data/messages.json';
const postsPath = './data/posts.json';

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

app.post('/api/posts', (req, res) => {
    const newPost = req.body;
    fs.readFile(postsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading posts");
            return;
        }
        const posts = JSON.parse(data);
        posts.push(newPost);
        fs.writeFile(postsPath, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error saving post");
                return;
            }
            res.status(201).send("Post saved");
        });
    });
});
app.get('/api/posts', (req, res) => {
    fs.readFile(postsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading posts");
            return;
        }
        res.json(JSON.parse(data));
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});