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

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const indexRoutes = require('./app/routes/index');
app.use('/', indexRoutes);

// 장비 관리
const equipmentRoutes = require('./app/routes/equipment');
app.use('/equipment', equipmentRoutes);

const usersRoutes = require('./app/routes/users');
app.use('/users', usersRoutes);
// 장비 로그 페이지

const equipmentLogRoutes = require('./app/routes/equipmentLog');
app.use('/equipment/log', equipmentLogRoutes);

const usersLogRoutes = require('./app/routes/usersLog');
app.use('/users/log', usersLogRoutes);

// 서버 상태 정보
const statusRoutes = require('./app/routes/status');
app.use('/status', statusRoutes);

// API
// app.js 또는 routes/index.js
app.use('/api/dashboard', require('./app/api/dashboard-grid'));
app.use('/api/server', require('./app/api/server'));
app.use('/api/equipment', require('./app/api/equipmentData'));
app.use('/api/status', require('./app/routes/status'));


app.listen(3000, '0.0.0.0', () => {
  console.log('🚀 Server running at http://localhost:3000');
});
