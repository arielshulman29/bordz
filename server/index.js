if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const boardRoutes = require('./routes/boards');
const authRoutes = require('./routes/user');
var connectDB = require('./config/db-config');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

app.use('/boards', boardRoutes);
app.use('/auth', authRoutes);

connectDB(process.env.CONNECTION_URL);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`serving on port ${port}`);
})


module.exports = app; // for testing
