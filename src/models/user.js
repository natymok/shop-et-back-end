const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    
    },
    lastName:{
        type:String,
        required:true,
        trim:true

    },
    username:{
        type:String,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true


    },
    password:{
        type:String,
        required:true

    },
    role:{
           type:String,
           enum:['user','admin'],
           default:'user'
    },
    secret:{
        type:String,
        default:'null'
    },
    profilePicture:{type:String}

},{timestamps:true})
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    this.secret=await bcrypt.hash(this.secret,salt)
    next();

})
userSchema.method({
    authenticate:function(userpassword){
        return bcrypt.compareSync(userpassword,this.password)
    },
   
})
module.exports=mongoose.model('user',userSchema)