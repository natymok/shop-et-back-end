const catagory=require('../../models/catagory.js')
const prodcut=require('../../models/Products.js')
const slugify=require('slugify')
const createCatagory=((_catagory,parentId = null)=>{
    let catagoryList=[]
    let _catagories
    if(parentId==null){
       _catagories= _catagory.filter((cat)=>(cat.parentId==undefined))
    }
    else{
        _catagories=_catagory.filter((cat)=>(cat.parentId==parentId))
    }
    for(let cat of _catagories){
        catagoryList.push({
        _id:cat._id,
         name:cat.name,
        slug:cat.slug,
        img:cat.img,
        children:createCatagory(_catagory,cat._id)

        })
    }
    return catagoryList

})

exports.addCatagory=(req,res,next)=>{
     let catagoryObject={
        name:req.body.name,
        slug:slugify(req.body.name),
        quantity:req.body.quantity,
    
    }
    if(req.file){
        catagoryObject.img="http://localhost:3000/public/" + req.file.filename

    }
    
    if(req.body.parentId){
        catagoryObject.parentId=req.body.parentId
    }
    const _catagory=new catagory(
        catagoryObject,
    )
    _catagory.save()
    .then((catagory)=>{
        res.status(200).json({
            catagory:catagory
        })
        
    })
    .catch((err)=>{
        res.status(400).json({
            err:'new error'
        })
    })

}
exports.getCatagory=(req,res,next)=>{
    console.log(req.body)
    catagory.find({})
    .then((data)=>{
            const catagories=createCatagory(data)
            res.status(200).json({
                catagories:catagories
            })

    })
    .catch((err)=>{
    
            res.status(400).json({
                err:err
            })
        

    })
}
exports.addProducts=(req,res,next)=>{
    let productPicture=[]
    if(req.files.length>0){
        productPicture=req.files.map((file=>{
            return {img:file.filename}
        }))
    

    }
    
        
    
    const{name,price,Description,catagory,createdBy}=req.body
    
  const item =new prodcut({
    name,
    price:parseInt(price),
    Description,
    catagory,
    createdBy:req.user._id,
    productPicture
    




  })
  item.save()
  .then((data)=>{
    res.status(200).json({
        data:data
    })
  })
  .catch((err)=>{
    res.status(400).json({
        errors:err
    })
  })

}
exports.addcat=(req,res,next)=>{
    let cats=req.body
    if(req.body.parentId){
        cat.parentId=req.body.parentId
    }
    const _cart=new cat(cats)
    _cart.save()
    .then((data)=>{
        res.status(200).json({
            data:data
        })
        
    })
    .catch((err)=>{
        res.status.json({error:err})
    })

}
exports.getcart=(req,res,next)=>{

    cat.find({},((err,data)=>{
        if(data){
            const getcatt=findcat(data)

        res.status(200).json({
            message:getcatt
        })
        }
        if(err){
            res.status(400).json({
                errors:err
            })
        }
    }))
  
   

}