const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/user')


router.post('/users', async (req, res) =>{
    const user = new User(req.body)
    

   try{
       await user.save()
       const token = await user.generateAuthToken()

       res.status(201).send({user, token})
   }catch(e){
        res.status(400).send(e)
   }
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send()
    }
   
})


/*


const aggregate = User.aggregate([
        { $group: { "_id": "$_id", name: {"$first": "Marcos"}, total: { $sum: "$age" } } }
     ])

const aggregate = User.aggregate([
        { $group: { "_id": "$_id", total: { $sum: "$age" } } }
     ])


const aggregate = User.aggregate([
        { $group: { "_id": "$name", total: { $sum: "$age" } } }   Junta a todos los que se llaman igual y les calcula la suma
     ])  .then((res)=>{
        for(let i = 0; i < res.length; i++){
            if(res[i]._id == "Marcos"){
                return console.log(res[i].total)
            }
        }
     }).catch((e)=>{
         console.log(e)
     })


*/

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({});
        
        res.send(users);
    }catch(e){
        res.status(500).send()
    }
  
})

router.get('/users/:id', async (req, res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user)
            return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})


router.patch('/users/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation) return res.status(400).send({error: 'Invalid key name'})

    const _id = req.params.id

    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save() //agregar esto, importante

        //const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        // se comenta esa linea porque bypassea mongoose y se conecta directamente a la BD y se pasa validadores etc, el middleware no es tomado en cuenta
        if(!user)
            return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/users/:id', async (req, res) =>{
    const _id = req.params.id

    try{
        const user = await User.findByIdAndDelete({_id})
        if(!user)
            return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router