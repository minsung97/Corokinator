const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {

    // 네이버 API
    var client_id = 'dJBjVDqHxmU7VvDDUEKA';
    var client_secret = 'KtuEipDncK';
    var api_url = 'https://openapi.naver.com/v1/search/news.json';
    var request = require('request');

    var options = {
      url: api_url,
      headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
      qs: {
        query: "코로나",
        display: 4,
        start: 1,
        sort: "sim"
      }
    };

    request.get(options, async (error, response, body) => {
      var data = JSON.parse(body);
      // console.log(data.items);
      datalist = data.items;
      // console.log(typeof datalist);
      res.render('./../views/main.html',{json_body : datalist});
    });
    // 네이버 API

  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
