import { MyContext } from "@/pages/_app";
import Signin from "@/pages/signin";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getLimit, setLimit } from "@/utils/limit";
const withAuth = Component => {
  const Auth = (props) => {
    const [cookies, setCookie, removeCookie,] = useCookies(['cookie']);
    
    const {setUser, isLoggedIn, setIsLoggedIn} = useContext(MyContext)
    useEffect(()=>{
      setUser({name:cookies.name})
      if(cookies.token){
        setIsLoggedIn(true)
      }
      if(!cookies.token){
        setIsLoggedIn(false)
      }
    },[])
    if(isLoggedIn=="null"){
      return ""
    }
    if (((getLimit() && getLimit() >= 5)) ? !isLoggedIn : false  ) {
      return (
        <Signin />
      );
    }
    return (
      <Component {...props}  />
    );
  };
  return Auth;
};

export default withAuth;