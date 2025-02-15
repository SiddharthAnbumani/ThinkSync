const {ValEntrySchema,ValNewUser}= require('./schemas')
const passport = require('passport')
const passportLocal = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')

module.exports.globalMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error: " + err.message);
};


module.exports.validatedEntry = async(req,res,next)=>{
  const{error} = ValEntrySchema.validate(req.body)
  if(error){
    console.log(error)
  }else{
    next()
  }
}

module.exports.passAuth = passport.authenticate('local', {
  successRedirect: '/show',
  failureRedirect: '/login',
  //failureFlash: true
});

module.exports.isAuth = (req,res,next)=>{
  if(!req.isAuthenticated()){
    return res.redirect('/login')
  }
  next();
}

