const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/task-manager-api', {
    
    //mongodb://user:password@127.0.0.1/task-manager-api?authSource=admin
    //mongodb://myTester:1234@127.0.0.1:27017/task-manager-api

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(()=>{
    
}).catch((e)=>console.log(e))








