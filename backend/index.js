const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

mongoose.connect(config.get('mongoURI'),
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected ...'))
    .catch(err => console.log(err));

app.use('/items', require('./routes/items.route'));
app.use('/users', require('./routes/users.route'));
app.use('/auth', require('./routes/auth.route'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log('Server started on port ' + port));