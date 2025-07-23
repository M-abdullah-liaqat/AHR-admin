import ConnectDB from "@/aboutData/ConnectDB";
import Products from "@/aboutData/Products";
import { NextResponse } from "next/server";

export async function GET() {
  await ConnectDB();
   let alls = await Products.find({})
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
  let newProduct = new Products(data);
  await newProduct.save();

  return NextResponse.json({ Sucess: true, message: "Product added" });
}
export async function DELETE(req) {
  const data = await req.json();
  await ConnectDB();
  await Products.deleteOne({_id: data.id})

  return NextResponse.json({ Sucess: true, message: "Product Deleted" });
}
