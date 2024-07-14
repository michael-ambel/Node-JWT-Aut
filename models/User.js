const mongoose = require('mongoose')
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: {
            validator: value => isEmail(value),
            message: 'Please enter a valid email address'
          }
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'minimum lengh is 6 charachter']
    }
});

//mongoose hook fire function after user created/saved
userSchema.post('save', (userData, next)=>{
    console.log("new user registerd", userData);
    next();
})

//mongoose hook fire function befor user created/saved
userSchema.pre('save', function(next){
    console.log('this user is about to register', this);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;