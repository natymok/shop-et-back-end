import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {AnimatePresence}from 'framer-motion'
import Header from "./Component/Header";
import Signup from './Component/Signup/Signup';
import Signin from './Component/Signin/Signin';
import Home from './Component/Home/Home';
import { useEffect } from 'react';
import { useStateValue } from './Context/StateProvider';
import axiosinstance from './Axios/Axios';
function App() {
  const [{token,cart,product,catagories},dispatch]=useStateValue()

  useEffect(()=>{
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
   axiosinstance.get('/getCatagories')
    .then((res)=>{
      if(res.status == '200')
      {
         dispatch({
          type:'getcatagory',
          catagory:res.data.catagories
         })
      }
    })
    .catch((err)=>{
      console.log(err)
    })
   

  },[])

  return (
    <div className="App">
      <AnimatePresence>
      <BrowserRouter>
       <Switch>
        <Route  exact path='/'>
          <Header></Header>
          <Home></Home>
          
        </Route>
        <Route  exact path='/signup'>
          <Signup></Signup>
        </Route>
        <Route  exact path='/signin'>
          <Signin></Signin>
        </Route>

       </Switch>
      
      </BrowserRouter>
      </AnimatePresence>
      
    </div>
      
  );
}

export default App;
