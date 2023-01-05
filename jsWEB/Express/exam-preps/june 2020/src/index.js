const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');
const express = require('express');
const hbs = require('express-handlebars');
const router = require('./router');
const dbInit = require('./config/dbConfig') 

const app = express();

app.engine('hbs', hbs.engine({extname:'hbs'}));
app.set('view engine','hbs');
app.use(express.static('static'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(router)

dbInit().then(() => {
    console.log('DB Connected');
    app.listen(3000, () => console.log('Listening on port 3000'))

})
