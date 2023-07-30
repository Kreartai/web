import React, { useState } from 'react'

function reset() {
  const [securityKey, setSecurityKey] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("")

  const handleVerify = (e) =>{
    e.preventDefault();
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email, dob, securityKey
      })
    }).then(res=>res.json())
    .then(res=>{
      setIsVerified(res.verified)
    })
  }
  const changePassword = (e) =>{
    e.preventDefault()
    fetch('/api/auth/set-password', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email, dob, securityKey, password
      })
    }).then(res=>res.json())
    .then(res=>{
      if(res.set){
        window.location.href= "/signin"
      }
    })
  }
  return (
    <div className="text-white">
      {
        !isVerified && 
        <form
        onSubmit={handleVerify}
        className=" text-slate-950 flex justify-center  "
      >
        <div className=" w-full max-w-[450px] m-10 mt-20 rounded-md gap-2 flex flex-col [&>*]:rounded-3xl [&>input]:px-3 [&>input]:bg-zinc-400 text-white [&>input]:py-2 [&>input]:outline-none [&>input]:mb-2  p-7 bg-zinc-600 [&>label]:mb-[-5px] [&>label]:ml-2 [&>label]:font-semibold [&>label]:text-sm">
          <h1 className="text-2xl font-bold text-white text-center mb-5">
            Security Questions
          </h1>
          <label className="text-white" htmlFor="email">
            EMAIL:
          </label>
          <input
            id="email"
            value={email}
            required
            onChange={(t) => setEmail(t.target.value)}
            type="email"
            placeholder="john@gmail.com"
            className="placeholder:text-white"
          />
          <label className="text-white" htmlFor="date">
            Date of Birth
          </label>
          <input
            id="date"
            value={dob}
            required
            onChange={(t) => setDob(t.target.value)}
            type="date"
            className="placeholder:text-white"
          />
          <label className="text-white" htmlFor="security">
            Mother's  maiden  name
          </label>
          <input
            id="security"
            value={securityKey}
            required
            onChange={(t) => setSecurityKey(t.target.value)}
            type="text"
            placeholder="Jane Doe"
            className="placeholder:text-white"
          />
          <button className=" bg-purple-500 text-white px-2 py-1 ">Submit</button>
        </div>
      </form>
      }
      {
        isVerified && 
        <form
        onSubmit={changePassword}
        className=" text-slate-950 flex justify-center "
      >
        <div className=" w-full max-w-[450px] m-10 mt-20 rounded-md gap-2 flex flex-col [&>*]:rounded-3xl [&>input]:px-3 [&>input]:bg-zinc-400 text-white [&>input]:py-2 [&>input]:outline-none [&>input]:mb-2  p-7 bg-zinc-600 [&>label]:mb-[-5px] [&>label]:ml-2 [&>label]:font-semibold [&>label]:text-sm">
          <h1 className="text-2xl font-bold text-white text-center mb-5">
            Reset Password
          </h1>
          <label className="text-white" htmlFor="pass">
            NEW PASSWORD
          </label>
          <input
            id="pass"
            value={password}
            onChange={(t) => setPassword(t.target.value)}
            required
            type="password"
            placeholder="Password"
            className="placeholder:text-white"
          />
          <button className=" bg-purple-500 text-white px-2 py-1 ">Submit</button>
        </div>
      </form>
      }
    </div>
  )
}

export default reset