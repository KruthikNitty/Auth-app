const jwt = require("jsonwebtoken")
const blacklist = require("../blacklist")

const SECRET = "mysecretkey"

module.exports = (req,res,next)=>{

const header = req.headers.authorization

if(!header){
return res.status(401).json({message:"Token missing"})
}

const token = header.split(" ")[1]

if(blacklist.has(token)){
return res.status(403).json({message:"Token blacklisted"})
}

try{

const decoded = jwt.verify(token,SECRET)
req.user = decoded
next()

}catch(err){

return res.status(401).json({message:"Token invalid or expired"})

}

}