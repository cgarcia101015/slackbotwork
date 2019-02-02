console.log('this is loaded');
require('dotenv');

theKeys = {
    slackBot: process.env.SLACKBOT_TOKEN  ,
    zomato: process.env.ZOMATO_USER_KEY,
    edamam: process.env.REACT_APP_APP_KEY,
    firebase: process.env.FIREBASE_KEY
}


// slackbot = {
//     key: process.env.SLACKBOT_TOKEN
// },
// zomato = {
//      key: process.env.ZOMATO_KEY
// },
// edaman = {
//     key: process.env.EDAMAN_KEY
// },
// firebase = {
//     key: process.env.FIREBASE_KEY
// }

module.exports = theKeys;
// console.log(keys);
