import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const MyContext = createContext();
export default function App({ Component, pageProps }) {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState({});
  const [inprogress, setInprogress] = useState(false);
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState("null")
  const [cookies, setCookie, removeCookie,] = useCookies(['cookie']);
  
  useEffect(()=>{
    setUser({name:cookies.name})
    if(cookies.token){
      setIsLoggedIn(true)
    }
    if(!cookies.token){
      setIsLoggedIn(false)
    }
  },[])
  const value = {
    prompt,
    setPrompt,
    generatedImage,
    setGeneratedImage,
    inprogress,
    setInprogress,
    user,
    setUser,
    isLoggedIn, setIsLoggedIn
  };
  return (
    <MyContext.Provider value={value}>
      <div className="bg-black min-h-screen">
        <Head>
          <title>Kreart.AI</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" autoClose={1000} />
      </div>
    </MyContext.Provider>
  );
}
