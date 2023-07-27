const express = require('express');
const { AuthModel } = require('../models/auth.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRouter = express.Router()




authRouter.post("/register", async (req, res) => {
    //Logic
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            const user = new AuthModel({ name, email, password: hash })
            await user.save()
            res.status(200).send({ "msg": "New User has been registered" })
        });

    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})


authRouter.post("/login", async (req, res) => {
    //Logic
    const { email, password } = req.body
    try {
        const user = await AuthModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                // result == true
                if (result) {
                    const token = jwt.sign({ userID: user._id }, "digisidekick");
                    res.status(200).send({ "msg": "Login Succesfull", token, name: user.name })
                } else {
                    res.status(200).send({ "msg": "Wrong Credentials!!!" })
                }
            });

        } else {
            res.status(200).send({ "msg": "Wrong Credentials!!!" })
        }
    } catch (error) {
        res.status(400).send({ "err": err.message })
    }
})

module.exports = {
    authRouter
}