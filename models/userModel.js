const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be less than 50 characters long']
    },
    email: { 
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        trim: true,
        select: false
    },
    photo: {String},
    
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
})

UserSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword) {
  const isMatch = await bcrypt.compare(candidatePassword, userPassword);
  return isMatch;
    };


UserSchema.methods.createJWT = async function() {
    return jwt.sign({ userId:this._id, name: this.name },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        })
}

module.exports = mongoose.model('User', UserSchema);