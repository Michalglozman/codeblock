const mongoose = require('mongoose');

mongoose.connect(`${process.env.REACT_APP_MONGODB_URI}`, {
    useNewUrlParser: true
}).then(()=> console.log('connected to DB'))
.catch(err =>console.log(`connection error ${err}`));