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

app.get('/cards', (request, response) => {
    response.render('form1.hbs');
});

app.post('/cards', urlencodedParser, async (request, response) => {
    // console.log(request.body.country_input);
    try {
        let cards = await api_call1.get_cards(request.body.card_input);
        response.render('form1.hbs', {
            objects: cards
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
    // console.log(request.body.picture_input);
    try {
        let pictureOut = await api_call2.get_pictures(request.body.picture_input);

        response.render('form2.hbs', {
            objects: pictureOut
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