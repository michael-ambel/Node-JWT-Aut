const mongoose = require('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

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

//mongoose hook fire function befor user created/saved
// userSchema.pre('save', function(next){
//     console.log('this user is about to register', this);  //to use the this method we need to use the normal function
//     next();
// })
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//mongoose hook fire function after user created/saved
// userSchema.post('save', (userData, next)=>{
//     console.log("new user registerd", userData);
//     next();
// })


const User = mongoose.model('user', userSchema);

module.exports = User;