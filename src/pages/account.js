import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./_app";
import withAuth from "@/HOCS/withAuth";
import { useCookies } from "react-cookie";

function Account() {
  const {user: { name, email },setUser, credit } = useContext(MyContext);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie"]);
 
  const handleLogout = () => {
    removeCookie("name");
    removeCookie("email");
    removeCookie("token");
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
            {
              credit > -1 && <div>Credit: {credit}</div> 
            }
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
