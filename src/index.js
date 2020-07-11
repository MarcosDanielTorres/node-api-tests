const express = require('express')
require('./db/mongoose')

//I SHOULD KNOW, NOT THAT I HAVE USED IT, THAT ARROW FUNCTIONS DOES NOT BIND THIS (WHATEVER THAT MEANS!)

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// without middleware: new request -> run route handler
// with middleware: new request -> do something -> run route handler

app.listen(port, () => {
    console.log('Server is up on port', port)
})
// I have some aggregation functions for learning in user.js

const jwt = require('jsonwebtoken')

const myFunction = async() => {
    
}

myFunction()