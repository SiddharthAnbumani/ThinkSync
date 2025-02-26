const User = require('../models/user')

module.exports.renderRegister = (req,res)=>{
    res.render('user/register')
}

module.exports.register = async(req,res) =>{
    const {password,username,email} = req.body
    const user = new User({username,email})
    const registeredUser = await User.register(user,password)
    req.flash('success', 'User registered successfully!');
    res.redirect('/show')
    console.log(registeredUser)
}

module.exports.renderLogin = (req,res)=>{
    console.log(req.user)
    res.render('user/login')
}

module.exports.login = (req,res)=>{
    res.redirect('/show')
}

module.exports.logout= (req,res,next)=>{
    req.logout(function (err) {
		if (err) {
			return next(err);
		}
	res.redirect('/login');
    });
}
    


