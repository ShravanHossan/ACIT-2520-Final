const axios = require('axios');
const _ = require('lodash');
// const key1 = '&APPID=e0dcf4ceae6f8222594cee6a185e5f8e';
// const key2 = '&key=AIzaSyCfl21brHvRsQjVFWEEctFFdd47eEUJHOM';
// const json = require('json')
const pixabay_key = '12227771-f59e4cfd20c64ee82db19e0e9';


var get_pictures = (picturetype) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pictures = await axios.get(`https://pixabay.com/api/?key=${pixabay_key}&q=${encodeURIComponent(picturetype)}&image_type=photo`);
            let pic = _.find(pictures.data.hits, 'userImageURL');
            let output = [];
            output.push(pic.userImageURL);
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