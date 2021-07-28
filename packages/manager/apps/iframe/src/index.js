const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'shell')));
app.use('/subshell1', express.static(path.join(__dirname, 'subshell1')));
app.use('/subshell2', express.static(path.join(__dirname, 'subshell2')));
app.use('/app1', express.static(path.join(__dirname, 'app1')));
app.use('/app2', express.static(path.join(__dirname, 'app2')));
app.use('/common', express.static(path.join(__dirname, 'common')));

app.listen(9000, 'localhost');
