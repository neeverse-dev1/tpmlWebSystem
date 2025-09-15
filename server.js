const express = require('express');
const path = require('path');
require('dotenv').config();

global.__basedir = __dirname;

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__basedir, 'app/views'));
app.use(express.static(path.join(__basedir, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRoutes = require('./app/routes/index');
app.use('/', indexRoutes);

// 장비 관리
const equipmentRoutes = require('./app/routes/equipment');
app.use('/equipment', equipmentRoutes);


app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
