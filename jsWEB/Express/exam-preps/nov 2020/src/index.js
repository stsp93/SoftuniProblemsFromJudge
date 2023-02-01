const express = require('express');
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars');
const { COOKIE_SECRET, PORT } = require('./config/constants');
const dbInit = require('./config/database')

const app = express();

app.engine('hbs', hbs.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.use(express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(COOKIE_SECRET))

dbInit().then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})