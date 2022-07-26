import React from 'react'
import { useState, createContext } from "react";
const userAuthContext = createContext()


export const UserProvider = ({children}) => {
    
    const [user,setUser] = useState({});
    const [auth,setAuth]= useState(false)
    const userState=(userDetails)=>{
            setUser(userDetails);
            setAuth(true);
           
           
    }

    return (
        <userAuthContext.Provider value={{user,auth,userState}}>
          {children}
        </userAuthContext.Provider>
      );
}

export default userAuthContext;   