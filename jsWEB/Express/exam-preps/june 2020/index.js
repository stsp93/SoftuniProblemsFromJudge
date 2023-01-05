const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');
const express = require('express');
const hbs = require('express-handlebars');
const router = require('./router');

const app = express();

app.engine('hbs', hbs.engine({extname:'hbs'}));
app.set('view engine','hbs');
app.use('/static',express.static('static'));
app.use(urlencoded({extended:false}));
app.use(cookieParser());
app.use(router)



app.listen(3000, () => console.log('Listening on port 3000'))