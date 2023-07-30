import React, { useContext } from "react";
import { getAuth, signInWithPopup,FacebookAuthProvider , GoogleAuthProvider } from "firebase/auth";
import firebaseInit from "@/libs/firebase";
import AppleLogo from "@/assets/apple.png";
import TwitterLogo from "@/assets/twitter.png";
import FbLogo from "@/assets/fb.png";
import GoogleLogo from "@/assets/google.png";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { MyContext } from "@/pages/_app";

function SocialSignin() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie']);
  const {setUser} = useContext(MyContext)
  const googleLogin = async () => {
    await firebaseInit();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
   
    // Google Login 
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const {displayName, email, uid} = result.user;
        fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: displayName,
            email,
            uid,
          })
        })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setCookie("token", res.token)
          setCookie("name", res.name)
          setCookie("uid", res.uid)
          setUser({ name: res.name, email:res.email})
          window.location.href = "/generate"
        })
        .catch(err=>{
          console.log(err)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Facebook Login 
  const facebookLogin = async () => {
    await firebaseInit();
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
   
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-white text-center mb-10">
      <div>
        <p className="text-sm font-light">Or, Sign in using</p>
        <div className="flex justify-center">
          <div className="flex items-center gap-4 mt-2">
            <div onClick={googleLogin} className="cursor-pointer">
              <Image src={GoogleLogo} className="w-[40px]" />
            </div>
            {/* <div onClick={facebookLogin} className="cursor-pointer">
              <Image src={FbLogo} className="w-[32px]" />
            </div> */}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialSignin;
