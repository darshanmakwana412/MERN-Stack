const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

UserSchema.statics.signup = async function(email, password) {

    if(!email || !password) {
        throw Error("All Fields must be Filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not Valid")
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email Already in use')
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user

}

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model("User", UserSchema);