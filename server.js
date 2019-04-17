const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const api_call1 = require('./public/api_call_1.js');
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
    response.render('form1.hbs');
});

app.post('/weather', urlencodedParser, async (request, response) => {
    let weatherOut = await api_call1.get_weather(request.body);

        response.render('form1.hbs', {
            output: weatherOut.main
        });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});