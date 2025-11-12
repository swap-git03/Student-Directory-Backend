const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db'); // connect MongoDB
const studentRoute = require('./routes/studentRoute');

const app = express();
const port = process.env.PORT || 7002;

app.use(cors());
app.use(express.json());

app.use('/student', studentRoute);

app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
