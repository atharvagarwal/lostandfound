const mongoose=require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const User= new mongoose.Schema({
    
    name:{
          type:String,
          
      },
    email:{
          type:String,
          unique:true,
      },
      googleId: String
  })
 User.plugin(findOrCreate);
const userModel=mongoose.model('user',User)

module.exports=userModel