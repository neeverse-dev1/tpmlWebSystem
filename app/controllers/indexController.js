const path = require('path');
const ejs = require('ejs');

exports.renderIndexPage = async (req, res) => {
  const bodyHtml = await ejs.renderFile(
    path.join(__basedir, 'app/views/index.ejs')
  );

  res.render('base', {
    title: '홈',
    body: bodyHtml,
    custom_style: '',
    custom_script: ''
  });
};

