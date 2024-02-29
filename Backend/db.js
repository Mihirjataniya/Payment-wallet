const mongoose = require("mongoose")

DATABASE =  process.env.DATABASE


mongoose.connect(process.env.DATABASE)


const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength:30
    },
    Firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    Lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength:20
    },
    Password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const AccountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User',
        required: true
    }, 
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User',UserSchema)
const Account = mongoose.model('Bank',AccountSchema)

module.exports = {
    User,
    Account
}