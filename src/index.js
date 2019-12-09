require('./model/User');
require('./model/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./api/authRoutes');
const trackRoutes = require('./api/trackRoutes')
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongooseUri = 'mongodb+srv://admin:passwordpassword@cluster0-hje6g.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongooseUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected')
})

mongoose.connection.on('err', (err) => {
    console.error('err', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is: ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('App running on port nr 3000')
})