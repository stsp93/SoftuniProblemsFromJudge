const express = require('express')
const hbs = require('express-handlebars');
const router = require('../routes.js');

module.exports = (app) => {
    app.engine('hbs', hbs.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');

    app.use(express.static('static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(router)
}

