const { request } = require('express')
const path=require('path')
const {check,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const multer=require('multer')
exports.validateRequest=[
    check('firstName')
    .notEmpty()
    .withMessage('first name is required'),
    check('lastName')
    .notEmpty()
    .withMessage('last name required'),
    check('email')
    .isEmail()
    .withMessage('in valid email'),
    check('email')
    .notEmpty()
    .withMessage('email required'),
    check('password')
    .isLength({min:6})
    .withMessage('password must be graeter  than 6')

    ]
    exports.validatesigninRequest=[
        check('email')
        .isEmail()
        .withMessage('enter valid email'),
        check('email')
        .notEmpty()
        .withMessage('enter your email first'),
        check('password')
        .notEmpty()
        .withMessage('enter your password to signin')
        
        
        
    ]
    exports.isValidatedRequest=(req,res,next)=>{
        const errors=validationResult(req)
    
        if(errors.array().length>0){
            return res.status(400).json({
                error:errors.array()[0].msg
            })
            
        }

     next()
    }
    exports.required=((req,res,next)=>{
        const token=req.headers.authorization
        
       jwt.verify(token,'the net ninja',((err,user)=>{
        if(err){
            res.status(401).json({
                message:err
            })
        }
        req.user=user
        next()
       }))
        
     
    
    })
    exports.isAdmin=(req,res,next)=>{
        if(req.user.role !=='admin'){
            return res.status(400).json({
                err:'sign in as admin to add catagories'
            })
        }
        next()
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null,path.join(path.dirname(__dirname),'uploads'))
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, uniqueSuffix+ '-'+file.originalname  )
        }
      })
   const upload=multer({storage:storage})
   exports.upload=upload
   const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'catagoryimg'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-'+file.originalname  )
    }
  })

const upload1=multer({storage:storage1})
exports.upload1=upload1
   
   
