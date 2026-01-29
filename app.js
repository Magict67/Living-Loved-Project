const fs = require('fs');

// Path to your data
const dataPath = './data/messages.json';

// message reader
fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Critical Error: Could not find the data path.", err);
        return;
    }
    
    // Convert text back to usable list
    const messages = JSON.parse(data);
    
    console.log("------------------------------------");
    console.log("LIVING LOVED - DAILY MESSAGE:");
    console.log(messages[1].text);
    console.log("------------------------------------");
});