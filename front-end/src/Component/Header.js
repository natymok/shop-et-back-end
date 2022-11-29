import React from 'react'
import { useState } from "react";
import {Link} from 'react-router-dom'
import axiosinstance from '../Axios/Axios';
import{motion} from 'framer-motion'
import {MdMenu,MdFastfood}from 'react-icons/md'
import {useStateValue}from  '../Context/StateProvider'
import logo from '../img/logo.webp'
import Cart from './CartModal/Cart';
function Header() {
    const [{token,catagories,products,cart},dispatch]=useStateValue()
    const [product, setProduct] = useState('');
    let selectedCatagory='' 
    const setcat=async (e)=>{
      selectedCatagory=e.target.value
      return selectedCatagory

    }
    const home=()=>{
      axiosinstance.get('/getProduct')
      .then((res)=>{
        if(res.status == '200')
        {
           dispatch({
            type:'getProduct',
            product:res.data.message
           })
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    const calltwoFunction=async (e)=>{
          const catagoryy= await setcat(e)
          searchByCatagory(catagoryy)  
    }
    const signOut=()=>{
        localStorage.clear()
        dispatch({
            type:'signin',
            token:null
        })
    }
    const searchByCatagory=(catagory)=>{
      axiosinstance.get('/search/products',
     
      {
         params: {
          catagory: catagory
         }
       } 
      
      
     )
     .then((res)=>{
       if(res.status == '200')
       {
          dispatch({
           type:'getProduct',
           product:res.data.message
          })
       }
     })
     .catch((err)=>{
       console.log(err)
     })

    }
    const search=()=>{
     axiosinstance.get('/search/products',
     
     {
        params: {
          name: product
        }
      } 
     
     
    )
    .then((res)=>{
      if(res.status == '200')
      {
         dispatch({
          type:'getProduct',
          product:res.data.message
         })
      }
    })
    .catch((err)=>{
      console.log(err)
    })
    }
    const toogle=(()=>{
        const menu=document.getElementById('ul')
        if( menu.style.display=='flex')
             { menu.style.display='none'}

        else{
            menu.style.display='flex'
        }
     
    
    })
  
  return (
    
      <nav>
        <div className='bg-orange-400 border-2 border-b-gray-200 h-[150px] flex justify-between items-center text-black '>
          <div className='flex items-center justify-between w-[100%] md:w-[50%]'>
          <div className='w-[10%]'>
            <MdFastfood className='w-10 h-10'></MdFastfood>
            <p className=' text-black font-serif font-semibold text-[0.9rem] md:text-[1rem]'>@ShopEt</p>
         </div>
         <div className='w-[100%] flex items-center justify-between'>
          <div className='w-full flex justify-end items-center gap-1'>
          <input type='text' className='w-[70%] md:w-[75%] border-2 border-gray-200 p-[.3em] md:p-[.5em] rounded-md text-black' onChange={(e)=>{setProduct(e.target.value)}} placeholder='search products'/>
         <motion.button whileTap={{scale:1.2}} onClick={search} className='w-[15%] md:w-[19%] h-[33px] md:h-10 bg-white text-[.7rem] md:text-[1rem] text-black font-serif font-semibold p-[.3em] md:p-[.5em] rounded-md'>Search</motion.button>
          </div>
           <div className='md:hidden flex items-center'>
           <MdMenu onClick={toogle} className='md:hidden w-10 h-6'></MdMenu>
         {token && (<Cart clas></Cart>)}
           </div>
         </div>

          </div>
         <div className='w-[50%] hidden md:block '>
            <ul  className=' flex justify-evenly font-serif font-semibold'>
                <motion.div onClick={home} className='cursor-pointer' whileTap={{scale:1.2}}>
                  Home
                </motion.div>
                <select onChange={(e)=>{calltwoFunction(e)}} className='bg-orange-400 rounded-md'>
                <option>Browse by Catagory</option>
                    {catagories && catagories.map((cat)=>(
                        
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
               {!token && (<Link className='text-[1rem]' to='/signup'>Register</Link>)}
                {!token && (<Link className='text-[1rem]' to='/signin'>Signin</Link>)}
                 {token && (<button onClick={signOut}>signOut</button>)}
                 {token && (<Cart></Cart>)}
                 
            </ul>
         </div>

        </div>
        {/*---------------------------for mobile screen--------------------------------------------------*/}
        <div   className=' md:hidden bg-orange-500'>
            <ul id='ul' className='hidden flex-col text-[0.rem] font-serif font-semibold'>
            <motion.div onClick={home} className='cursor-pointer' whileTap={{scale:1.2}}>
                  Home
                </motion.div>
                <select onChange={(e)=>{calltwoFunction(e)}} className='bg-orange-400 rounded-md'>
                <option>Browse by Catagory</option>
                    {catagories && catagories.map((cat)=>(
                        
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <Link className='text-[1rem]' to='/signup'>Register</Link>
                {!token && (<Link className='text-[1rem]' to='/signin'>Signin</Link>)}
                 {token && (<button onClick={signOut}>signOut</button>)}
            </ul>
        </div>
      </nav>

  )
}

export default Header