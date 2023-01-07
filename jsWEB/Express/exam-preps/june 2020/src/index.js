const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('express-handlebars');
const router = require('./router');
const dbInit = require('./config/dbConfig') 
const constants = require('./config/constants');
const {auth} = require('./middlewares/authMiddleware');

const app = express();

app.engine('hbs', hbs.engine({extname:'hbs'}));
app.set('view engine','hbs');
app.use(express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(constants.COOKIE_SECRET));
app.use(auth)
app.use(router)

dbInit().then(() => {
    console.log('DB Connected');
    app.listen(3000, () => console.log('Listening on port 3000'))

})
