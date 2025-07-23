"use client"
import MyContext from "@/app/context/MyContext"
import { useState,useEffect } from "react"

function ContextRapper({children}) {
    const [session, setsession] = useState()
  useEffect(() => {
    let data= localStorage.getItem("loged")
    if(data){
      let fin = JSON.parse(data)
      setsession(fin);
    }else{
      setsession("")
    }
  }, [])

  return (
    <MyContext.Provider value={{session,setsession}}>
        {children}
    </MyContext.Provider>
  )
}

export default ContextRapper