const express = require("express")
const accountRouter = express.Router()
const {Account} = require("../db")
const { authMiddlewear } = require("../middlewear")
const { default: mongoose } = require("mongoose")

accountRouter.get('/balance',authMiddlewear,async (req,res)=>{
 
    
    const account = await Account.findOne({
        userId: req.user_Id
    })
    res.status(200).json({
        balance: account.balance
    })
})

accountRouter.post('/transfer',authMiddlewear,async(req,res)=>{
    const session = await mongoose.startSession()

    session.startTransaction()
    const touserId = req.body.touserId
    const amount = req.body.amount

    const account = await Account.findOne({
        userId: req.user_Id
    }).session(session)

    if(!(account) || account.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            msg: "Not enough Amount in your account"
        })
    }

    const toAccount = await Account.findOne({
        userId : touserId
    }).session(session)

    if(!(toAccount)){
        await session.abortTransaction()
        return res.status(400).json({
            msg: "Reciver account not found"
        })
    }

    await Account.updateOne({userId: req.user_Id}, { $inc:{ balance: -amount} }).session(session)
    await Account.updateOne({userId: touserId}, { $inc:{ balance: amount} }).session(session)

    await session.commitTransaction()
    res.status(200).json({
        msg: "Transaction Successfull"
    })
    
})

module.exports = accountRouter