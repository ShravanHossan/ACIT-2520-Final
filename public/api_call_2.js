const axios = require('axios');
const _ = require('lodash');
// const key1 = '&APPID=e0dcf4ceae6f8222594cee6a185e5f8e';
// const key2 = '&key=AIzaSyCfl21brHvRsQjVFWEEctFFdd47eEUJHOM';
// const json = require('json')
// const pixabay_key = '12227771-f59e4cfd20c64ee82db19e0e9';


var get_pictures = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const pictures = await axios.get(`https://pixabay.com/api/?key=${pixabay_key}&q=${encodeURIComponent(picturetype)}&image_type=photo`);
            const pictures = await axios.get(`https://images-api.nasa.gov/search?q=${query}`);
            console.log(pictures.data.collection.items[0].links[0].href);
            // let pic = _.find(pictures.data.collection, 'href');
            let pic = pictures.data.collection.items[0].links[0].href;
            let output = [];
            output.push(pic);
            console.log(output);
            resolve(output)
        } catch (e) {

            reject(e);
        }
    })
};

module.exports = {
    get_pictures
};