const express = require('express')
const userRouter = express.Router()
const zod = require("zod")
const {User,Account} = require('../db')
const jwt = require("jsonwebtoken")
const {authMiddlewear} = require("../middlewear")   


const signupUser = zod.object({
    Email: zod.string().email() ,
    Firstname: zod.string().max(20) ,
    Lastname: zod.string().max(20) ,
    Password :zod.string().min(6)
})

const signinUser = zod.object({
    Email: zod.string().email(),
    Password: zod.string().min(6)
})

const updateUser = zod.object({
    Firstname: zod.string().max(20).optional() ,
    Lastname: zod.string().max(20).optional() ,
    Password :zod.string().min(6).optional()
})


userRouter.post('/signup',async (req, res) => {
    const userdata = signupUser.safeParse(req.body)
    if(!(userdata.success)){
        res.status(411).json({
            msg: "Incorrect Inputs!!!"
        })
    }
    const existingUser = await User.findOne({ Email: req.body.Email });

    if(existingUser){
        return res.status(411).json({
            msg: "User already exists"
        })
    }

    const user = await User.create({
        Email: req.body.Email,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Password: req.body.Password
    })

    const amount = await Account.create({
        userId: user._id,
        balance: 1 + Math.floor(Math.random()*10000)
    })
    const user_Id = user._id
    const token = jwt.sign({
        user_Id
    },process.env.JWT_SECRET)
    
    res.status(200).json({
        msg: "User created successfully!!",
        token: token,
        user_Id,
        Firstname: user.Firstname,
        Lastname: user.Lastname
    })
 })

userRouter.post('/signin',async (req,res)=>{
    const signinData = signinUser.safeParse(req.body)
    if(!(signinData.success)){
        res.status(411).json({
            msg: "Inputs are incorrect"
        })
    }
    console.log(signinData.data.Email)
    console.log(signinData.data.Password)
    const user = await User.findOne({
        Email: signinData.data.Email,
        Password: signinData.data.Password
    })
  
    console.log(user)
    
     if(user){
        const token = await jwt.sign({
            user_Id: user._id
        },process.env.JWT_SECRET)

        res.status(200).json({
            msg: "Logged In succesfull",
            token: token,
            user_Id: user._id,
            Firstname: user.Firstname,
            Lastname: user.Lastname
        })
     }else{
        res.status(411).json({
            msg: "User Not Found!!"      
        })
}
})

userRouter.put("/", authMiddlewear , async (req,res)=>{
    const userDATA = updateUser.safeParse(req.body)
    console.log(userDATA)
    if(!(userDATA.success)){
        res.status(411).json({
            msg: "User Cannot be updated"
        })
    }
    await User.updateOne({_id:req.user_Id},{ 
        $set: req.body
    })
    res.json({
        msg: "User Updated successfully"
    })

})


userRouter.get("/bulk", async (req,res)=>{
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


module.exports = userRouter
