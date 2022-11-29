const user=require('../../models/user')
exports.getusers=(req,res,next)=>{
    user.find({},((err,users)=>{
        if(err)
        {
            res.status(400).json({
                error:err
            })
        }
        if(users)
        {
            res.status(200).json({
                message:users

            })
            
        }
    }))


}