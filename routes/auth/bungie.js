var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');
var fetch = require('node-fetch');

const TOKEN_URL = 'https://www.bungie.net/platform/app/oauth/token/';

router.get('/', function (req, res) {
    var code = req.headers.auth_code;
    fetch(TOKEN_URL, {
        method: "POST",
        body: querystring.stringify({
            grant_type: 'authorization_code',
            code,
            client_id: `${process.env.BUNGIE_CLIENT_ID}`,
            client_secret: `${process.env.BUNGIE_CLIENT_SECRET}`
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(response => res.send(response))
        .catch(error => console.log(error));
});

router.get('/refresh', function (req, res) {
    var refresh = JSON.parse(req.headers.refresh_token);
    fetch(TOKEN_URL, {
        method: "POST",
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh,
            client_id: `${process.env.BUNGIE_CLIENT_ID}`,
            client_secret: `${process.env.BUNGIE_CLIENT_SECRET}`
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(response => res.send(response))
        .catch(error => console.log(error));
});

module.exports = router;