import express from 'express';
import path from 'path';
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:1234@ds233500.mlab.com:33500/leave-man');
var db = mongoose.connection;

var users = require('./routes/users');
var auth = require('./routes/auth');
var leave = require('./routes/leave');
var employee = require('./routes/employee');
var common = require('./routes/common');
var admin = require('./routes/admin');
var academic = require('./routes/academic');

let app = express();


app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/leave', leave);
app.use('/api/employee', employee);
app.use('/api/common', common);
app.use('/api/academic', academic);
app.use('/api/admin', admin);

app.listen(3003,() => console.log("Server is running at port 3003"))