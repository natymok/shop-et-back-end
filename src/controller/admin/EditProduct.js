const product =require('../../models/Products')
exports.UpdateProduct=(req,res)=>{
    const filter={_id:req.body.id}
    const update=req.body
    product.findOneAndUpdate(filter,update,{
        new: true,
        upsert: true,
        rawResult: true 
    })
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