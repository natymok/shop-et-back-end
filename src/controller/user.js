const user = require('../models/user.js')
const jwt=require('jsonwebtoken')

exports.signup=(req,res,next)=>{
   
 user.findOne({email:req.body.email})
.then((data)=>{
    if(data){
    res.status(400).json({
        error:'email already exist'
    
    })
}
else{

    const _user=new user({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        email:req.body.email,
        username:Math.random().toString()
       

})
_user.save((err,data)=>{
    if(err){
        res.status(501).json(err)
    }
    if(data){
        res.status(200).json(data)
    }
})



    
  

}

})
}
exports.signin=(req,res,next)=>{
    signAccesToken=(id,role)=>{
        const token=jwt.sign({id,role},'the net ninja',{expiresIn:'1y'})
        return token
     }
     signrefereshToken=(id,role)=>{
        const token=jwt.sign({id,role},'the net ninja2',{expiresIn:'1y'})
        return token
     }
 
    const email=req.body.email
    const password=req.body.password
    user.findOne({email:email})
    .then((userr)=>{
    if(userr.authenticate(password)){
     const user=signAccesToken(userr._id,userr.role)
     const refreshtoken=signrefereshToken(userr._id,userr.role)
        res.status(200).json({
            message:'loged in',
            Accesstoken:user,
            Refreshtoken:refreshtoken
        })
        
        
     }
     else{
        res.status(400).json({
            message:'passsword incorrect'
        })
     }
      
    })
   .catch(()=>{
    res.status(400).json({
        message:'somthing went wrong '
    })
   })


}


exports.required=((req,res,next)=>{
    const token=req.headers.authorization
   jwt.verify(token,'the net ninja',((err,user)=>{
    if(err){
        res.status(401).json({
            message:'forbiden acesses'
        })
    }
    req.user=user
    
   }))
    
    next()

})
