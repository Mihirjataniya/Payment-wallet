const express = require('express')
const cors = require('cors')
require('dotenv').config()
const PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())

const RootRouter = require('./routes/index')

app.use("/api/v1",RootRouter);



app.listen(PORT,()=>{
    console.log("Server Is Live!!!")
})