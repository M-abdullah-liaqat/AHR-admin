import ConnectDB from "@/aboutData/ConnectDB";
import Orders from "@/aboutData/Orders";
import { NextResponse } from "next/server";

export async function GET() {
  await ConnectDB();
  let alls = await Orders.find({})
    .then((item) => {
      return item;
    })
    .catch((item) => {
      return item;
    });
  return NextResponse.json(alls);
}
export async function POST(req) {
  const data = await req.json();
  await ConnectDB();
  let newOrder= new Orders(data)
  await newOrder.save();
  return NextResponse.json({sucess:true,message:"order-placed"});
}
export async function PUT(req) {
  const data = await req.json();
  await ConnectDB();
  await Orders.updateOne(data.filter, data.update)
  return NextResponse.json({sucess:true,message:"Updated"});
}
export async function PATCH(req) {
  const data = await req.json();
  await ConnectDB();
  let res =await Orders.findOne(data)
  return NextResponse.json({status: res.status});
}