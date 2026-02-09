const express = require('express');
const fs = require('fs');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'living-loved-secret',
    resave: false,
    saveUninitialized: true
}));
const dataPath = './data/messages.json';
const postsPath = './data/posts.json';
const usersPath = './data/users.json';

app.post('/api/register', (req, res) => {
    const newUser = req.body;
    fs.readFile(usersPath, 'utf8', (err, data) => {
        const users = JSON.parse(data || '[]');
        users.push(newUser);
        fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
            res.status(201).send("User registered");
        });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile(usersPath, 'utf8', (err, data) => {
        const users = JSON.parse(data || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            req.session.user = user;
            res.send("Login successful");
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});
app.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});
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
    if (!req.session.user) {
        return res.status(401).send("Please login to post");
    }
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
       if (err || !data.trim()) {
            return res.json([]); 
        }
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.json([]);
        }
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});