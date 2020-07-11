const express = require('express')
const taskRouter = express.Router()

const Task = require('../models/task')


taskRouter.post('/tasks', async (req, res) =>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send()
    }catch(e){
        res.status(400).send(e)
    }
})

taskRouter.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

taskRouter.get('/tasks/:id', async (req, res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task)
            return res.status(404).send()
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})


taskRouter.patch('/tasks/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation) return res.status(400).send({error: 'Invalid key name'})
    
    const _id = req.params.id

    try{
        const task = await Task.findById(_id, req.body)
        updates.forEach((value) => {
            task[value] = req.body[value]
        })
        await task.save()

        //const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true}) lo mismo que en User
        if(!task)
            return res.status(404).send()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

taskRouter.delete('/tasks/:id', async (req, res) =>{
    const _id = req.params.id

    try{
        const task = await Task.findByIdAndDelete({_id})
        if(!task)
            return res.status(404).send()
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})


module.exports = taskRouter