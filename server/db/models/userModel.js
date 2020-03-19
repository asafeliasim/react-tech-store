const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypts');

const User = mongoose.model('users',{
    id:{
        type: Number,
        isRequired: true

    },
    userName: {
        type: String,
        isRequired: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minLength:7,
        trim:true,
    },
    products:{
        type: []
    }
});

/*const UserSchema = new mongoose.Schema({
        id:{
            type: Number,
            isRequired: true

        },
        userName: {
            type: String,
            isRequired: true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim : true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
        },
        password:{
            type: String,
            required: true,
            minLength:7,
            trim:true,
        },
        products:{
            type: []
        }
    }
);

UserSchema.statics.findByCredentials = async (email,password) =>{
    //console.log('findByCredentials')
    const user = await User.findOne({email})
    //console.log(user.name)
    if(!user){
        throw new Error('Unable to find user')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    console.log(isMatch)
    if(!isMatch){
        throw new Error('Password is invalid')
    }
    return user
};

const User = mongoose.model('users',UserSchema);*/

module.expots = User;
