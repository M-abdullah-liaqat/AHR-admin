"use client"
import Image from "next/image";
import { useEffect, useState,useContext } from "react";
import MyContext from "./context/MyContext";
import Link from "next/link";
export default function Home() {

  let session=useContext(MyContext)
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const handleLog=()=>{
    if(Username=="Abdullah" && Password =="ABD@1234"){
        let DATA={username: Username, password: Password}
        localStorage.setItem("loged", JSON.stringify(DATA))
        session.setsession(DATA)
    }
}
  if(session.session){
  return (
    <div className="min-w-screen min-h-[90vh] flex gap-3 justify-center items-center">
      <div className="space-y-3">
        <div className="text-2xl font-bold text-center">Welcome to AHR admin area</div>
        <div className="space-x-3">
          <Link href={`/add-product`}><button className="py-2 px-5 cursor-pointer text-xl font-medium text-white bg-black rounded-xl">Add Product</button> </Link>
          <Link href={`/orders`}><button className="py-2 px-5 cursor-pointer text-xl font-medium text-white bg-black rounded-xl">Orders</button> </Link>
          <Link href={`/allproducts`}><button className="py-2 px-5 cursor-pointer text-xl font-medium text-white bg-black rounded-xl">See Collection</button> </Link>
          </div>
      </div>
    </div>
  );
}
else{
  return(
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <div className="space-y-3 shadow-2xl px-5 py-5 rounded-[5px]">
       <div className="text-2xl font-medium">Login to <span className="font-bold">AHR</span> admin area</div>
        <div className=" space-y-3">
        <div className="text-xl font-medium">Enter Username</div>
        <input value={Username} onChange={(e)=>{setUsername(e.target.value)}} className="w-[300] py-1 px-2 border-1 border-neutral-400 rounded-xl" type="text" placeholder="Enter username" />
        </div>
        <div className=" space-y-3">
          <div className="text-xl font-medium">Enter password</div>
        <input value={Password} onChange={(e)=>{setPassword(e.target.value)}}  className="w-[300] py-1 px-2 border-1 border-neutral-400 rounded-xl" type="text" placeholder="Password" />
        </div>
        <div className="justify-self-center">
          <button onClick={handleLog} className="text-2xl py-2 px-5 bg-black text-white rounded-2xl cursor-pointer">Login</button>
        </div>
      </div>
    </div>
  )
}
  
}
