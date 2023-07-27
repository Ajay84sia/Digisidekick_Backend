const mongoose = require('mongoose')

// Define the Auth schema
const authSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    versionKey: false
})

// Create the Auth model
const AuthModel = mongoose.model('auth', authSchema)

// Export the Auth model
module.exports = {
    AuthModel
}