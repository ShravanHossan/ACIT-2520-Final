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
    if (request.body.card_input < 1){
        response.render('form1.hbs', {
            output: "Number has to be positive"

        });
    }
    try {
        console.log(request.body.card_input);
        let cards = await api_call1.get_cards(request.body.card_input);
        // console.log(weatherOut);
        let objects = [];
        for (var i = 0; i < cards.length; i ++) {
            objects[i] = { image: cards[i], link: cards[i] };
        }
        var data = { objects: objects };
        // console.log(data);

        response.render('form1.hbs', {
            objects: objects
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
        if (request.body.picture_input === null) throw "Enter an item";

        let pictureOut = await api_call2.get_pictures(request.body.picture_input);
        // console.log(weatherOut);
        // console.log(pictureOut);
        response.render('form2.hbs', {
            output1: pictureOut[0],
            output2: pictureOut[1],
            output3: pictureOut[2]
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