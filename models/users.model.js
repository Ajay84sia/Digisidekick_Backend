const mongoose = require('mongoose')

// Define the User schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    userID: { type: String, required:true },
}, {
    versionKey: false
})

// Create the User model
const UserModel = mongoose.model('user', userSchema)

// Export the User model
module.exports = {
    UserModel
}