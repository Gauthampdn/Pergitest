const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => { // next is to go to the next middleware

  //verify authentication
  const { authorization } = req.headers

  if(!authorization){
    return res.status(401).json({error: "authorizaiton required"})
  }

  const token = authorization.split(" ")[1] // authorization is  string that looks like "Bearer asedfgyhnu5v3wxxstcuv5fijds"

  try {

    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select("_id")
    console.log(req.user)
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})    
  }

}

module.exports = requireAuth