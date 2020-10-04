const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

//Environment config
env.config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongo connected.');
});
//middleware body-parser
app.use(express.json())
app.use('/api', authRoutes);
app.use('/api', adminRoutes)


app.get('/', (req, res) => {
    res.status(200).json({
        name: 'Prachi'
    })
})

app.listen(process.env.PORT || 9000, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})