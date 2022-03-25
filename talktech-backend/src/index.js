const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// routes
app.use(require('./routes/index'));

app.use(require('./routes/contacts'));

app.listen(3002);
console.log('Server on port 3002');
