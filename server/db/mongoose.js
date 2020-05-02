const mongoose = require('mongoose');
const URL_DB= 'mongodb://127.0.0.1:27017/tech-store-api';

mongoose.Promise = global.Promise;
mongoose.connect(URL_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>console.log('connect to DB'));




