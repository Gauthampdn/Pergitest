const User = require("../models/userModel")
const Template = require("../models/templateModel"); // Adjust the path if needed
const jwt = require("jsonwebtoken")
const defaultTemplates = require('./DefaultTemplates');


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: "5d"}) // how long until expiration of token
}

//login user

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try{
    const user = await User.login(email, password)
    const token = createToken(user._id)
    
    res.status(200).json({ token, user})
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

//signup user

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);

    const currentTime = new Date(); // Get the current time

    // Create default templates for the new user
    for (let templateData of defaultTemplates) {
      await Template.create({
        ...templateData,
        user_id: user._id,
        createdAt: currentTime, // Set the createdAt to the current time
        updatedAt: currentTime  // Set the updatedAt to the current time
      });
    }

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  signupUser,
  loginUser
}
