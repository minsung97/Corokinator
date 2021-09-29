const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();
// connect();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());

app.use('/', indexRouter);

app.use((res, req, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    // res.render('error');
});

// var client_id = 'dJBjVDqHxmU7VvDDUEKA';
// var client_secret = 'KtuEipDncK';
// var api_url = 'https://openapi.naver.com/v1/search/news.json';
// var request = require('request');

// var options = {
//     url: api_url,
//     headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
//     qs: {
//         query: "코로나",
//         display: 3,
//         start: 1,
//         sort: "sim"
//     }
// };

// request.get(options, function (error, response, body) {
//     console.log(body);
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

