const User = require('../models/User')


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
    return(errors)
}
module.exports.signup_get = (req, res) => {
    res.render('signup')
}
module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.create({email, password})
        res.status(201).json(user);
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