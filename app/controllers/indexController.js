const path = require('path');
const ejs = require('ejs');

exports.renderIndexPage = async (req, res) => {

  res.render('base', {
    title: '홈',
    page: 'index',
    custom_style_pre: '',
    custom_style: '',
    custom_script_pre: '',
    custom_script: ''
  });
};

