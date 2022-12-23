const app = require('express')();
const { databaseInit } = require('./config/database');
const server = require('./config/server');


server(app);


databaseInit().then(() => {
    app.listen(3000, '', () => console.log('Listening to server'))

})
    