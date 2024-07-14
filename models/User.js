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

const User = mongoose.model('user', userSchema);

module.exports = User;