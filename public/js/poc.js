var http = require('https');
const express = require('express');
const app = express();

app.get('/testing', (req , res) => {
    res.send('hellooooo ');
});

console.log('fdfdfdf');