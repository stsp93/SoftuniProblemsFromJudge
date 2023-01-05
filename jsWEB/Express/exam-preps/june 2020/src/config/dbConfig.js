const db = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/exam-prep';
db.set('strictQuery', false);
module.exports = () => db.connect(connectionString);

