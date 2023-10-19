
// environment vars
require("dotenv").config()


const express = require("express")
const mongoose = require("mongoose")
const templateRoutes = require("./routes/templates")
const openaiRoutes = require("./routes/openai")
const authRoutes = require("./routes/auth")
const session = require('express-session');
const passport = require("passport");



const cors = require('cors');

// express app
const app = express()


// middleware
app.use(express.json()) // to get req body



const allowedOrigins = [
  'https://pergi.onrender.com',
  'https://pergiv0-1backend.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true
}));



app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
 }
}));



app.use(passport.initialize());
app.use(passport.session());




app.use( (req, res, next) => {
  console.log(req.method, req.path)
  next()
} )

//routes
app.use("/auth", authRoutes)
app.use("/api/templates", templateRoutes)
app.use("/openai", openaiRoutes)



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, ()=>{
      console.log("connected to DB and listening on the port " + process.env.PORT);
    })
  })
  .catch((err) => {
    console.log(err);
  })



// listening on port 

