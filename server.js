const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const api_call1 = require('./public/api_call_1.js');
const api_call2 = require('./public/api_call_2.js');
const port = process.env.PORT || 8080;

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});



app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
    setTimeout(() => {
        next();
    }, 1000);

});
hbs.registerPartials(__dirname + '/views/partials');
app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: "Welcome to my semi-response site"
    });
});

app.get('/weather', (request, response) => {
    response.render('form1.hbs');
});

app.post('/weather', urlencodedParser, async (request, response) => {
    // console.log(request.body.country_input);
    try {
        let weatherOut = await api_call1.get_weather(request.body.country_input);
        // console.log(weatherOut);
        response.render('form1.hbs', {
            output: weatherOut.main
        });
    }catch (e) {
        response.render('form1.hbs', {
            output: e
        });
    }

});

app.get('/picture', (request, response) => {
    response.render('form2.hbs');
});

app.post('/picture', urlencodedParser, async (request, response) => {
    console.log(request.body.picture_input);
    try {
        if (request.body.picture_input === null) throw "Enter an item";

        let pictureOut = await api_call2.get_pictures(request.body.picture_input);
        // console.log(weatherOut);
        console.log(pictureOut);
        response.render('form2.hbs', {
            output: pictureOut
        });
    }catch (e) {
        response.render('form2.hbs', {
            output: e
        });
    }

});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});