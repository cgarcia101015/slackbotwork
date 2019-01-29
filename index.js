const Slackbot = require('slackbots');
const axios = require('axios');
var express = require('express');
var app = express();
require("dotenv").config();
var slackbot = new Slackbot(keys.slackbot);
// const bot = new Slackbot({
//     // token: 'xoxb-535280373492-535338113139-KvpwIrBjx2j3NW4o82IA5oYR',
//     // token: 'xoxb-535280373492-535338113139-64TBIBHywQeSxeej66FdnD1B',
//     name: 'mealbot'
// });

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':burrito:'
    }

    bot.postMessageToChannel('general', 'Get ready to find your meal with @FindaMeal', params);
});

// Receive event payload to Request URL via HTTP POST
app.post("/", function (req, res, next) {
    // Get event payload
    var payload = req.body;
    // Respond to this event with HTTP 200 status
    res.sendStatus(200);
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }
    console.log(data);
    console.log(data.bot_id);
    var userInput = data.text;
    // Logs everything being said to slackbot
    console.log(userInput);
    handleMessage(data);
    // console.log(data);



// Respond to Data
function handleMessage(data) {
    if (data.subtype !== 'bot_message' && data.text !== undefined) {
        findFood();
    }
}

// Return a recipe 
function findFood() {
    axios.get('https://api.edamam.com/search?q=' + userInput + '&app_id=45d6973d&app_key=a104dcac382786daa58cb39db2166cb2').then(function (response) {
        var jsonData = response.data;

        var showData = [
            "Main Ingredient: " + jsonData.q,
            "Title: " + jsonData.hits[1].recipe.label,
            "Image: " + jsonData.hits[1].recipe.image,
            "Url to Recipe: " + jsonData.hits[1].recipe.url,
        ].join("\n\n");

        var params = {
            icon_emoji: ':bread:'
        };
        bot.postMessageToChannel('general', 'Here\'s an idea: ' + showData, params);
    });
}
});
