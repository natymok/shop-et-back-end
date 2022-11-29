const product =require('../../models/Products')
exports.deleteProduct=(req,res,next)=>{
    product.findByIdAndDelete(req.body.id)
    .then((data)=>{
        res.status(200).json({
            message:data
        })
    })
    .catch((err)=>{
        res.status(400).json({
            error:err
        })
    })

}