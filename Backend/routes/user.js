const express = require('express')
const userRouter = express.Router()
const zod = require("zod")
const { User, Account, Friends } = require('../db')
const jwt = require("jsonwebtoken")
const { authMiddlewear } = require("../middlewear")


const signupUser = zod.object({
    Email: zod.string().email(),
    Firstname: zod.string().max(20),
    Lastname: zod.string().max(20),
    Password: zod.string().min(6)
})

const signinUser = zod.object({
    Email: zod.string().email(),
    Password: zod.string().min(6)
})

const updateUser = zod.object({
    Firstname: zod.string().max(20).optional(),
    Lastname: zod.string().max(20).optional(),
    Password: zod.string().min(6).optional()
})


userRouter.post('/signup', async (req, res) => {
    const userdata = signupUser.safeParse(req.body)
    if (!(userdata.success)) {
        res.status(411).json({
            msg: "Incorrect Inputs!!!"
        })
    }
    const existingUser = await User.findOne({ Email: req.body.Email });

    if (existingUser) {
        return res.status(411).json({
            msg: "User already exists"
        })
    }

    const user = await User.create({
        Email: req.body.Email,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Password: req.body.Password,
        Friend: []
    })

    const amount = await Account.create({
        userId: user._id,
        balance: 0
    })

    const user_Id = user._id
    const token = jwt.sign({
        user_Id
    }, process.env.JWT_SECRET)

    res.status(200).json({
        msg: "User created successfully!!",
        token: token,
        user_Id,
        Firstname: user.Firstname,
        Lastname: user.Lastname
    })
})

userRouter.post('/signin', async (req, res) => {
    const signinData = signinUser.safeParse(req.body)
    if (!(signinData.success)) {
        res.status(411).json({
            msg: "Inputs are incorrect"
        })
    }

    const user = await User.findOne({
        Email: signinData.data.Email,
        Password: signinData.data.Password
    })
    if (user) {
        const token = await jwt.sign({
            user_Id: user._id
        }, process.env.JWT_SECRET)

        res.status(200).json({
            msg: "Logged In succesfull",
            token: token,
            user_Id: user._id,
            Firstname: user.Firstname,
            Lastname: user.Lastname
        })
    } else {
        res.status(411).json({
            msg: "User Not Found!!"
        })
    }
})

userRouter.get("/SignedinUser", authMiddlewear, async (req, res) => {
    const user_Id = req.user_Id
    try {
        const user_details = await User.findOne({
            _id: user_Id
        })
        if (user_details) {
            res.status(200).json({
                user_details: user_details
            })
        } else {
            res.status(401).json({
                msg: "Something went wrong"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal ERROR"
        })
    }
})


userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""
    const users = await User.find({
        $or: [
            { Firstname: { $regex: filter, $options: 'i' } },
            { Lastname: { $regex: filter, $options: 'i' } }
        ]
    })
    res.json({
        user: users.map(user => ({
            Email: user.Email,
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            _id: user._id

        }))
    })
})


userRouter.post('/addfriend', authMiddlewear, async (req, res) => {
    try {
        const sender_Id = req.user_Id
        const reciever_Id = req.body.reciever_Id
        console.log("sender id  " ,sender_Id)
        console.log("rec id  " ,reciever_Id)
        const sender_account = await User.findOne({
            _id: sender_Id
        })
        const reciever_account = await User.findOne({
            _id: reciever_Id
        })
        
        console.log("sender account ",sender_account);
        console.log("rec account", reciever_account);


        if(!reciever_account || !sender_account){
            return res.status(400).json({
                msg : 'User not found'
            })
        }
      
        const sender_account_user_id = sender_account._id
        const sender_account_Firstname = sender_account.Firstname
        const sender_account_Lastname = sender_account.Lastname

        sender_account.Friends.push({
            Friends_id : reciever_account._id,
            Firstname: reciever_account.Firstname,
            Lastname: reciever_account.Lastname
        })
        await sender_account.save()
        reciever_account.Friends.push({
            Friends_id :sender_account._id ,
            Firstname: sender_account.Firstname,
            Lastname: sender_account.Lastname
        })
        await reciever_account.save()

        res.status(200).json({
            msg : 'Friends Added'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Something went wrong"
        })
    }
})

module.exports = userRouter
