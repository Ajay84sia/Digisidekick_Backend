const express = require('express');
const { UserModel } = require('../models/users.model')
const userRouter = express.Router();


userRouter.get("/", async (req, res) => {

    try {
        const users = await UserModel.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})

userRouter.get("/search", async (req, res) => {
    const query = req.query.search
    try {
        const users = await UserModel.find({ "name": { "$regex": query, "$options": "i" } })
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})

userRouter.get("/sort", async (req, res) => {
    const order = req.query.age
    try {
        if (order == "asc") {
            const users = await UserModel.find().sort({ "age": 1 })
            res.status(200).send(users)
        } else {
            const users = await UserModel.find().sort({ "age": -1 })
            res.status(200).send(users)

        }
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})

userRouter.get("/filter", async (req, res) => {
    const query = req.query.gender
    try {
        const users = await UserModel.find({ "gender": query })
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})


userRouter.get("/self", async (req, res) => {

    try {
        const users = await UserModel.find({ userID: req.body.userID })
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})



userRouter.post("/", async (req, res) => {
    try {
        const user = new UserModel(req.body)
        await user.save()

        res.status(200).send({ 'msg': 'New User Data has been added' })
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
})


userRouter.patch("/update/:userID", async (req, res) => {
    const { userID } = req.params;
    const user = await UserModel.findOne({ _id: userID })
    try {
        if (req.body.userID !== user.userID) {
            res.status(200).send({ "msg": "You are not authorized to perform this action" })
        } else {
            await UserModel.findByIdAndUpdate({ _id: userID }, req.body)
            res.status(200).send(`The user with id:${userID} has been updated`)
        }
    } catch (err) {
        res.status(400).send(err)
    }

})

userRouter.delete("/delete/:userID", async (req, res) => {
    const { userID } = req.params;
    const user = await UserModel.findOne({ _id: userID })
    try {
        if (req.body.userID !== user.userID) {
            res.status(200).send({ "msg": "You are not authorized to perform this action" })
        } else {
            await UserModel.findByIdAndDelete({ _id: userID })
            res.status(200).send(`The user with id:${userID} has been deleted`)
        }
    } catch (err) {
        res.status(400).send(err)
    }

})



module.exports = {
    userRouter
}