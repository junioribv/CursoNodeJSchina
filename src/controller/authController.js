const express = require('express')

const User = require('./../model/user')
const bcrypt = require('bcryptjs')

const router = express.Router()




router.post('/', async (req, resp) =>{

    try{
        const {login} = req.body
        if(await User.findOne({login}))
            return resp.status(400).send({error: "usuario ja existe"})
        const user = await User.create(req.body)


        user.password = undefined
        resp.send({user})
    }catch(err){
        return resp.status(400).send ({error: 'Error'})
    }
})

router.post('/authenticate', async (req, resp) =>{
    try{
        const {login, password} = req.body
        const user = await User.findOne({login}).select('+password')
        
        if(!user)
            return resp.status(401).send ({error: 'Usuario nao encontrado'})
        if(! await bcrypt.compare(password, user.password))
            return resp.status(401).send ({error: 'Senha Incorreta'})
            user.password = undefined

        resp.send({ user })
    
    }catch(err){
        return resp.status(400).send ({error: 'Erro no login ou senha'})
    }
})











module.exports = (app) => app.use('/auth', router)