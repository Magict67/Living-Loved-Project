const fs = require('fs');

// Path to data
const dataPath = './data/messages.json';

// message reader
fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Critical Error: Could not find the data path.", err);
        return;
    }
    
    
    // Convert text
    const messages = JSON.parse(data);

    // LOGIC: Auto picks random index depends on list length
    const randomIndex = Math.floor(Math.random() * messages.length);
    const selectedMessage = messages[randomIndex];
    
    console.log("------------------------------------");
    console.log("LIVING LOVED - DAILY MESSAGE:");
    console.log(selectedMessage.text);
    console.log(`CATEGORY: ${selectedMessage.category.toUpperCase()}`); // Verify current sync
    console.log("------------------------------------");
});