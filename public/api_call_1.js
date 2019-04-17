const axios = require('axios');
const key1 = '&APPID=e0dcf4ceae6f8222594cee6a185e5f8e';
const key2 = '&key=AIzaSyCfl21brHvRsQjVFWEEctFFdd47eEUJHOM';
const _ = require('lodash');
// const json = require('json')

//takes a location input and returns weather
var get_cards = (num) => {
    return new Promise(async (resolve, reject) => {
        try {
            const output = [];
            const deck_init = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deck_id = deck_init.data.deck_id;

            const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${num}`);
            // console.log(cards.data.cards[0].image);
            for (i in cards.data.cards)
                output.push(cards.data.cards[i].image);

            var objects = [];
            for (var i = 0; i < output.length; i ++) {
                objects[i] = {image: output[i], link: output[i]};
            }
            resolve(objects)
        } catch (e) {

            reject(e);
        }
    })
};

module.exports = {
    get_cards
};