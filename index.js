require('dotenv').config();

const Slackbot = require('slackbots');
const axios = require('axios');
var express = require('express');
var app = express();
const bot = new Slackbot({
	token: process.env.SLACKBOT_TOKEN,
	name: 'mealbot'
});

// Start Handler
bot.on('start', () => {
	const params = {
		icon_emoji: ':burrito:'
	};

	bot.postMessageToChannel('general', 'Get ready to find your meal with @FindaMeal', params);
});

// // Receive event payload to Request URL via HTTP POST
// app.post("/", function (req, res, next) {
//     // Get event payload
//     var payload = req.body;
//     // Respond to this event with HTTP 200 status
//     res.sendStatus(200);
// });

// // Error Handler
// bot.on('error', (err) => console.log(err));

// // Message handler
// bot.on('message', (data) => {
//     if (data.type !== 'message') {
//         return;
//     }
//     console.log(data);
//     console.log(data.bot_id);
//     var userInput = data.text;
//     // Logs everything being said to slackbot
//     console.log(userInput);
//     handleMessage(data);
//     // console.log(data);
// Mention Handler - someone mentions the app
bot.on('message', function(data) {
	if (data.username === 'mealbot' || data.subtype === 'bot_message') {
		return;
	}
	if (data.text === '<@UFR9Y3B43>') {
		bot.postMessageToChannel('meal-finding-slackbot', 'Yes, how can I help you?', {
			slackbot: true,
			icon_emoji: ':question:'
		});
	}
	if (data.type === 'message' && data.username != 'findameal' && data.text != 'undefined') {
		var userInput = data.text;
		userInput = userInput.replace(' ', '+');
		console.log('A message was sent that said: ' + userInput);
		returnLunch();
	}

	// Return a recipe
	function returnLunch() {
		axios
			.get(
				'https://api.edamam.com/search?q=' +
					userInput +
					'&app_id=45d6973d&app_key=a104dcac382786daa58cb39db2166cb2'
			)
			.then(function(response) {
				var jsonData = response.data;

				var showData = [
					'Main Ingredient: ' + jsonData.q,
					'Title: ' + jsonData.hits[1].recipe.label,
					'Image: ' + jsonData.hits[1].recipe.image,
					'Url to Recipe: ' + jsonData.hits[1].recipe.url
				].join('\n\n');

				var params = {
					icon_emoji: ':bread:'
				};
				bot.postMessageToChannel('meal-finding-slackbot', "Here's an idea: " + showData, params);
			});
	}
});
