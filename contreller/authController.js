const User = require('../models/User')
const jwt = require('jsonwebtoken')

//creat token
const maxAge = 3 * 24 * 60 * 60;
const userToken = (id) => {
    return jwt.sign({id}, 'secrate code', { expiresIn: maxAge })
}
//error handler
const errorHandler = (err)=> {
    console.log(err.message, err.code);
    let errors = {email: "", password: ""}

    //duplicate email error
    if(err.code === 11000){
        errors.email = "email is alredy registered"
        return errors;
    }

    //validater error
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        }); 
    }
    return errors;
}
module.exports.signup_get = (req, res) => {
    res.render('signup')
}
module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.create({email, password})
        const token = userToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(201).json({user});
    }
    catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }

}
module.exports.login_get = (req, res) => {
    res.render('login')
}
module.exports.login_post = (req, res) => {
    res.send('new login')
    const {email, password} = req.body;
    console.log(req.body);
    console.log(email, password);
    
}