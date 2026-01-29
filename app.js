const fs = require('fs');

// Path to your data
const dataPath = './data/messages.json';

// message reader
fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Critical Error: Could not find the data path.", err);
        return;
    }
    
    // Convert text back to usable
    // Convert text back to usable
    const messages = JSON.parse(data);

    // DYNAMIC LOGIC: Automatically picks a random index based on list length
    const randomIndex = Math.floor(Math.random() * messages.length);
    const selectedMessage = messages[randomIndex];
    
    console.log("------------------------------------");
    console.log("LIVING LOVED - DAILY MESSAGE:");
    console.log(selectedMessage.text);
    console.log(`Category: ${selectedMessage.category}`); // Verifies the schema you just synced
    console.log("------------------------------------");
});