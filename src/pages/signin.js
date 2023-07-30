import Link from "next/link";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { MyContext } from "./_app";
import SocialSignin from "@/components/SocialSignin/SocialSignin";
import { toast } from "react-toastify";
function Signin() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(MyContext);
  const handleSignin = (e) => {
    e.preventDefault();
    fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.verified) {
          setCookie("token", res.token);
          setCookie("name", res.name);
          setUser({ name: res.name });
          window.location.href = "/generate";
        } else {
          console.log("unauthorized");
          toast("UnAuthorized");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSignin}
        className=" text-slate-950 flex justify-center  "
      >
        <div className="w-full max-w-[450px] m-10 mt-20 rounded-md gap-2 flex flex-col [&>*]:rounded-3xl [&>input]:px-3 [&>input]:bg-zinc-400 text-white [&>input]:py-2 [&>input]:outline-none [&>input]:mb-2  p-7 bg-zinc-600">
          <h1 className="text-2xl font-bold text-white text-center mb-5">
            Signin
          </h1>
          <label className="text-white" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            value={email}
            onChange={(t) => setEmail(t.target.value)}
            type="email"
            className="placeholder:text-white"
            placeholder="Email"
          />
          <label className="text-white" htmlFor="pass">
            Password
          </label>
          <input
            id="pass"
            value={password}
            onChange={(t) => setPassword(t.target.value)}
            type="password"
            className="placeholder:text-white"
            placeholder="Password"
          />
          <button className=" bg-purple-500 text-white px-2 py-1 ">
            Submit
          </button>
        </div>
      </form>
      <SocialSignin />
      <div className="flex flex-col items-center justify-center  gap-2">
        <div className="flex gap-2">
          <p className="text-white">Lost your password?</p>
          <p className=" text-purple-400">
            <Link href="/reset">Reset</Link>
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-white">Don't have an account?</p>
          <p className=" text-purple-400">
            <Link href="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
