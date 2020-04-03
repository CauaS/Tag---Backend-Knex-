const express = require('express');
const app = express();
const cors = require('cors');
const routers = require('./routes');


app.use(express.json());
app.use(cors());
app.use(routers)


app.listen(3333, '0.0.0.0');