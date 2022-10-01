import mongoose from "mongoose";

// Defining Schema 

const userSchema = new mongoose.Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true},
    city:{type:String,required:true},
    isActive:{type:Boolean, default:true},
    join:{type:Date,default:Date.now},
    
})


// Model
const userModel = mongoose.model('user',userSchema)


export default userModel