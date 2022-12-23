const express = require('express')
const router = require('../routes.js');
const mongoose = require('mongoose');
const connectionString = 'mongodb://127.0.0.1:27017/cubicle';


exports.databaseInit = () => mongoose.connect(connectionString);

