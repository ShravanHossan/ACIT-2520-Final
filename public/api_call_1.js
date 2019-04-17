const axios = require('axios');
const key1 = '&APPID=e0dcf4ceae6f8222594cee6a185e5f8e';
const key2 = '&key=AIzaSyCfl21brHvRsQjVFWEEctFFdd47eEUJHOM';


var get_weather = (city) => {
    return new Promise((resolve, reject) => {
        try {
            const address = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}${key2}`);
            address.then(result=> {
                // console.log(result.data);
                let lat_lng = result.data.results[0].geometry.location;
                // console.log(address.results[0].geometry.location);
                // console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat_lng.lat}&lon=${lat_lng.lng}${key1}`);
                const weather = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat_lng.lat}&lon=${lat_lng.lng}${key1}`);
                weather.then((result)=> {
                    // console.log(result);
                    resolve(result.data.weather[0])
                })

            })

        } catch (e) {
            reject(e.message)
        }
    })
};
//
// get_weather('toronto').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// });

module.exports = {
    get_weather
};