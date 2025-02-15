const express = require('express')
const session = require('express-session')
const cors = require('cors')
const methodOverride = require('method-override')
const flash = require('express-flash')
const app = express()
const path = require('path')
const entryRoutes = require('./routes/entry')
const userRoutes = require('./routes/user')
const {globalMiddleware} = require('./middleware')

//Validationx
const Joi = require('joi')
const JoiEntrySchema = require('./schemas')

//Authenticaton
 const passport = require('passport');
 const localStrategy = require('passport-local')

const User = require('./models/user')
const Entry = require('./models/entry')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/journalApp')
.then (()=>{
    console.log("CONNECTED TO MONGO")
})
.catch(err =>{
    console.log('ERROR')
})

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const sessionConfig = {
    secret : 'secrets',
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.Success = req.flash();
    res.locals.error = req.flash()
    next();
})
//Passport Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



//Routes
app.use('/', entryRoutes)
app.use('/', userRoutes)

app.listen(3000,()=>{
    console.log('ON PORT 3000')
})
