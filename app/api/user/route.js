import ConnectDB from "@/aboutData/ConnectDB";
import Users from "@/aboutData/Users";
import { NextResponse } from "next/server";

export async function PUT(req) {
    await ConnectDB();
    let mail= await req.json()
    let email= mail.email
    const currentUser= await Users.findOne({email: email})
    if(currentUser){
        return NextResponse.json(currentUser)
    }
    return NextResponse.json(null)
}
export async function PATCH(req) {
    await ConnectDB();
    let mail= await req.json()
await Users.findOneAndUpdate(mail.filter, mail.update,{new: true})
    return NextResponse.json({sycess: true, message: "Updated"})
}
export async function POST(req) {
    await ConnectDB();
    let mail= await req.json()
    let email= mail.email
      const newUser= new Users({username: email.split("@")[0], email: email});
      await newUser.save();
      return NextResponse.json({sucess: true, message: "Saved"})
}
export async function DELETE(req) {
    await ConnectDB();
      let mail= await req.json()
      if(!mail?.email || !mail?.username || !mail?.password ){
        return NextResponse.json({sucess: false, message: "All fields required"})
      }else{
    let veri=await Users.findOne({email: mail.email})
    if(veri){
        return NextResponse.json({sucess: false, message: "Already have an Account"})
    }else{
      const newUser= new Users({username: mail.username, email: mail.email, password: mail.password});
      await newUser.save();
      return NextResponse.json({sucess: true, message: "Saved"})
    }
      }
}