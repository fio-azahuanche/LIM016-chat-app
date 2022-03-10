/* eslint-disable prettier/prettier */
const express = require('express');
const cors = require('cors');
// const path = require('path');

const app = express();

const port = 5000;

app.use(cors());
// app.use('/home', express.static(path.join(__dirname,'/build')));

app.get('/', (req, res) => {
    res.send('Hola mundo desde el backend')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})