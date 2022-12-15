const express = require('express')
const app = express();
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { urlencoded } = require('express');
const bcrypt = require('bcrypt');
const { removeAllListeners } = require('nodemon');


const sessions= [];
const accounts = [];
const tokenSecret = 'tokenSecret'
const cookieSecret = 'cookieSecret'

app.engine('hbs', hbs.engine({
    extname:'hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static('static'))
app.use(urlencoded({extended:false}))
app.use(cookieParser(cookieSecret))

app.get('/', (req,res) => {
    try {
        const token = req.cookies.session
        const email = jwt.verify(token,tokenSecret).email
        res.render('home',{email})

    } catch(err) {
        res.render('home',{email:'Guest'})
    }
})

app.get('/secret', (req,res) => {
    const token = req.cookies.session
    console.log(jwt.verify(token,tokenSecret));
    
    res.render('home')
})

// LOGIN

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req,res) => {
    const {email, password} = req.body
    const account = accounts.find(a => a.email === email);

    if(!account || !bcrypt.compare(password, account.hash)) return res.status(403).send('Invalid email or pass');
    

    const token = jwt.sign({email},tokenSecret, {expiresIn:'2d'})
    res.cookie('session', token);
    sessions.push(token)

    res.redirect('/')
})

//REGISTER

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register',async (req,res) => {
    const {email, password} = req.body

    const hash = await bcrypt.hash(password, 10);
    accounts.push({email, hash});


    res.redirect('/')
})

// LOGOUT

app.get('/logout', (req, res) => {
    res.clearCookie('session')
    res.redirect('/')
})


app.listen(3000,() =>  console.log('Server is listening'))

