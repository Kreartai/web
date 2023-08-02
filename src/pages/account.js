import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./_app";
import withAuth from "@/HOCS/withAuth";
import { useCookies } from "react-cookie";

function Account() {
  const [user, setUser] = useState({})
  const {name, email, credit} = user
  const [cookies, setCookie, removeCookie] = useCookies(["cookie"]);
  useEffect(()=>{
    fetch('/api/user')
      .then(res=>res.json())
      .then(result=>{
        setUser(result.user)
      })
      .catch(err=>{
        console.log(err);
      })

  },[])
  console.log(name, email, credit);
  const handleLogout = () => {
    removeCookie("name");
    removeCookie("email");
    removeCookie("token");
    removeCookie("uid");
    removeCookie("_id");
    window.location.href = "/";
    setUser({});
  };
  return (
    <div className="flex justify-between mx-10 mt-5 text-white">
        <>
          <div className="[&>*]:mb-2">
            {
              name && <div>Name: {name}</div>
            }
            {
              email && <div>Email: {email}</div>
            }
            {/* {
              credit > -1 && <div>Credit: {credit}</div> 
            } */}
          </div>
          <div>
            <button
              className="bg-red-400 px-3 rounded-sm text-sm py-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
    </div>
  );
}

export default withAuth(Account);
