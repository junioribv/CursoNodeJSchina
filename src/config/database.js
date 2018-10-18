const mongoose = require('mongoose')
const url = 'mongodb://localHost:27017/Minicurso'
mongoose.connect(url, {useCreateIndex: true, useNewUrlParser: true})

mongoose.Promise = global.Promise

module.exports = mongoose