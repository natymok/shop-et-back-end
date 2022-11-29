import { fetch } from "../FectchLocalStorage/Fech"
const token=fetch()
export const initialstate={
    token:token,
    catagories:null,
    product:null,
    cart:null
    
    
}