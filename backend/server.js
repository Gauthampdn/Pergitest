// environment vars
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const templateRoutes = require("./routes/templates")
const openaiRoutes = require("./routes/openai")
const authRoutes = require("./routes/auth")
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require("passport");
const cors = require('cors');

// express app
const app = express()

// middleware
app.use(express.json()) // to get req body

app.use(cors({
  origin: 'https://pergi.app',
  credentials: true
}));

// Connect to the database and set up session store
mongoose.connect(process.env.MONGO_URI).then((client) => {
    app.use(session({
        secret: 'keyboard cat',
        store: MongoStore.create({ 
          clientPromise: mongoose.connection.getClient(),
          dbName: 'your-database-name' // replace 'your-database-name' with the name of your MongoDB database
        }),
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // days hours minutes seconds milli
            secure: true,
            httpOnly: true,
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        console.log(req.method, req.path)
        next()
    })

    //routes
    app.use("/auth", authRoutes)
    app.use("/api/templates", templateRoutes)
    app.use("/openai", openaiRoutes)

    // Start the server after connecting to the database
    app.listen(process.env.PORT, () => {
        console.log("connected to DB and listening on the port " + process.env.PORT);
    })
}).catch((err) => {
    console.log(err);
});
