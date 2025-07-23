"use client";
import { useState } from "react";
import localFont from "next/font/local";
import { useRef, useContext, useEffect } from "react";
import Link from "next/link";
import MyContext from "@/app/context/MyContext";
const antonFont = localFont({
  src: "./fonts/Anton-Regular.ttf",
});

function NavBar() {
  let session=useContext(MyContext)
  const needFocus = useRef();
  const [showDrop, setshowDrop] = useState(false);
  const onHam = useRef();
  if (typeof window !== "undefined") {
    window.onclick = function (event) {
      if (event.target !== needFocus.current) {
        setshowDrop(false);
      }
    };
  }
  if(session.session){
  return (
    <div className="Navbar bg-[#2A2A2A] text-[#E4E3E3]">
      <div className="flex justify-between  2xl:w-[1532px] w-[100%] justify-self-center 2xl:px-0 px-5">
        <div className={`logo ${antonFont.className} flex gap-1 items-center`}>
          <Link href={"/"}>
            {" "}
            <div className="lg:text-[48px] md:text-[42px] cursor-pointer text-[36px] font-bold">
              AHR<span className="md:text-lg text-[16px] pl-1">Admin Area</span>
            </div>
          </Link>
        </div>
        <ul className="flex lg:text-xl font-medium gap-1 items-center">
          <Link href="/add-product">
            <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Add Product
            </li>
          </Link>
          <Link href="/orders">
            <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Orders
            </li>
          </Link>
          <Link href="/allproducts">
            <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              All Products
            </li>
          </Link>
          <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
            <button 
            onClick={()=>{
              localStorage.setItem("loged", "")
             session.setsession("");
            }}
            className="cursor-pointer flex">
              <span className="">LogOut</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
}

export default NavBar;
