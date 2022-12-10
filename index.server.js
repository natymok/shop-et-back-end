const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const path=require('path')
require('dotenv').config()
const app=express()
const adminRoutes=require('./src/routes/admin')
const userRoutes=require('./src/routes/user.js')
const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URI ,
    {   useNewUrlParser:true,
    useUnifiedTopology:true,
    
     }
    )
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})
const bodyParser=require('body-parser')
app.use(cors())
app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, INLINE, 'https://etshop-server.onrender.com'],
        'style-src': [SELF, 'mystyles.net'],
        'img-src': ['data:', 'https://etshop-server.onrender.com/public'],
        'worker-src': [NONE],
        'block-all-mixed-content': true    }
}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser())
app.use('/api',userRoutes)
app.use('/api',adminRoutes)
app.use('/public', express.static(path.join(__dirname, 'src','uploads')))
app.use( '/public',express.static(path.join(__dirname, 'src','catagoryimg')))
if(process.env.NODE_ENV=='production')
{   console.log('production mode active')
   
}
else{
    console.log('devv mode')
    app.get('/',((req,res)=>{
        res.send('api running')
    }))
}

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server lisineng on port${process.env.PORT || 3000}`)
})