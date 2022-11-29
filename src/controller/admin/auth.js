const user = require('../../models/user')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const express=require('express')
const app=express()
app.use(cookieParser())
exports.signup=(req,res,next)=>{
user.findOne({email:req.body.email})
.then((data)=>{
    if(data){
    res.status(400).json({
        error:'email already exist'
    
    })
}
else{
  
    const _user=new user({ firstName:req.body.firstName,
                           lastName:req.body.lastName,
                           password:req.body.password,
                           email:req.body.email,
                           username:Math.random().toString(),
                           role:req.body.role,
                           secret:req.body.secret
                           
                          
    
    })
     
    if(req.body.secret==="create admin"){

        _user.save()
        .then((userr)=>{
        res.status(201).json({
            message:'user craeted successfully'
        }) 
    })
    .catch((err)=>{
      
          res.status(401).json({
             error:'somthing went wrong '
     
         })
     
     })

    }
    else{
        res.status(401).json({
            error:"access Denied"
        })
    }
  

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
    if(userr){
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
               res.status(401).json({
                   error:'passsword incorrect'
               })
            }
    }
    else{
        res.status(400).json({
            error:'email not found'
        })
    }
    
      
    })
   .catch((err)=>{
    res.status(400).json({
        error:err
    })
   })


}


exports.required=((req,res,next)=>{
    const token=req.headers.authorization
   jwt.verify(token,'the net ninja',((err,user)=>{
    if(err){
        res.status(401).json({
            error:'forbiden acesses'
        })
    }
    if(user){
        req.user=user
        next()
    }
  

   }))
    


})
