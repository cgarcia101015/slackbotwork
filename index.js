const Slackbot = require('slackbots');
const axios = require('axios');

const bot = new Slackbot({
    token: 'xoxb-535280373492-535338113139-KvpwIrBjx2j3NW4o82IA5oYR',
    name: 'mealbot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':burrito:'
    }

    bot.postMessageToChannel('general', 'Get ready to find your meal with @FindaMeal', params);
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
    // console.log(data.text);
});

// Response to Data
function handleMessage(message) {
    if (message.includes(' pizza')) {
        findFood(message);

    }
}

// Finds the food
function findFood(message) {
    axios.get('https://api.edamam.com/search?q=' + message + '&app_id=45d6973d&app_key=a104dcac382786daa58cb39db2166cb2')
        .then(res => {
            var jsonData = res.data;
            var showData = [
                "Main Ingredient: " + jsonData.q,
                "Title: " + jsonData.hits[1].recipe.label,
                "Image: " + jsonData.hits[1].recipe.image,
                "Url to Recipe: " + jsonData.hits[1].recipe.url,
            ].join("\n\n");
            console.log(message);

            var params = {
                icon_emoji: ':burger:'
            };
            bot.postMessageToChannel('general', 'Here\'s an idea: ' + showData, params);
        });
};
