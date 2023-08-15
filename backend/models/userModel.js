const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

//static signup method

userSchema.statics.signup = async function(email, password) { // can't use arrow funtion since we are using the this keyword
  
  //validation
  if( !email || !password ){
    throw Error("All fields must be filled")
  }
  if(!validator.isEmail(email)){
    throw Error("Email is not valid")
  }
  if(!validator.isStrongPassword(password)){
    throw Error("Password is not strong enough")
  }

  const exists = await this.findOne({ email }) // this refers to User

  if(exists){ // NULL means not exists
    throw Error("Email already used")
  }

  const salt = await bcrypt.genSalt(10) // creating salt
  const hash = await bcrypt.hash(password, salt) // adding salt to hashed password

  const user = await this.create({ email, password: hash}) // create a user with an email and password of hash

  return user

}

// static login method
userSchema.statics.login = async function(email, password) {
  if( !email || !password ){
    throw Error("All fields must be filled")
  }

  const user = await this.findOne({ email }) // 'this' refers to User

  if(!user){ // NULL means not exists
    throw Error("Can't find this email, try sigining up")
  }

  const match = await bcrypt.compare(password, user.password) // a method on bcrypt that compares a password with a hased password

  if(!match){
    throw Error("Incorrect password")
  }

  return user 

}


module.exports = mongoose.model("User", userSchema)