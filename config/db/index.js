const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;

async function connect() {

    try {
        mongoose.connect(
            URI,
            { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Succesful!");
    } catch (error) {
        console.log("Fail!");
    }
}

module.exports = { connect }