const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const authMiddleware = require("./middleware/auth")
const blacklist = require("./blacklist")

const app = express()
app.use(express.json())
app.use(cors())

const SECRET = "mysecretkey"

app.post("/api/login",(req,res)=>{

const {username,password} = req.body

if(username !== "Kruthik" || password !== "kruthik123"){
return res.status(401).json({message:"Invalid credentials"})
}

const token = jwt.sign({username},SECRET,{expiresIn:"1h"})

res.status(200).json({
token,
username,
loginTime: new Date()
})

})

app.get("/api/profile",authMiddleware,(req,res)=>{
res.status(200).json({
username:req.user.username,
message:"Welcome Kruthik Nitty",
loginTime:req.user.iat
})
})

app.post("/api/logout",(req,res)=>{

const token = req.headers.authorization?.split(" ")[1]

blacklist.add(token)

res.status(200).json({message:"Logged out"})
})

app.listen(5000,()=>{
console.log("Server running on 5000")
})