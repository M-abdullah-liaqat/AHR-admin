"use client";
import useSWR from "swr";
import { useState, useContext } from "react";
import MyContext from "../context/MyContext";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Page() {
  let session = useContext(MyContext);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const { data, error, isLoading } = useSWR(`/api/order`, fetcher, {
    refreshInterval: 300000, // Auto refresh every 5 seconds
    revalidateOnFocus: true, // Refetch when tab is active
    dedupingInterval: 2000, // Avoid multiple requests in 2s
  });
  const allOrders = [];
    if(data){
    for (let i = data.length - 1; i >= 0; i--) {
      allOrders.push(data[i]);
    }
  }
  const handleStatus = async (e, item) => {
    item.status = e.target.value;
    let res = await fetch("/api/order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { _id: item._id },
        update: { status: e.target.value },
      }),
    });
  };
  const handleLog = () => {
    if (Username == "Abdullah" && Password == "ABD@1234") {
      let DATA = { username: Username, password: Password };
      localStorage.setItem("loged", JSON.stringify(DATA));
      session.setsession(DATA);
    }
  };
  if (isLoading)
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center text-2x1 font-medium">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center text-2xl font-medium">
        Error loading products
      </div>
    );
  if (session.session) {
    return (
      <div className="2xl:w-[1532px] w-[100%] justify-self-center">
        <div className="py-10 px-4 space-y-5">
          {allOrders.length !== 0 ? (
            allOrders.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-2 border-neutral-500 rounded-[5px] bg-neutral-100 py-3 flex justify-between gap-3 px-4 text-neutral-800"
                >
                  <div className="flex  items-center gap-8">
                    <div className="w-[100px] h-[100px] ">
                      <img src={item.productDetail.image.url} alt="" />
                    </div>
                    <div className=" space-y-3">
                      <div>
                        {item.productDetail.name} * {item.productDetail.ram}gb *{" "}
                        {item.productDetail.storage}gb
                      </div>
                      <div>
                        Name: {item.userDetail.fname + " "}
                        {item.userDetail.lname}, Email: {item.userDetail.email}
                      </div>
                      <div>
                        <div>{item.userDetail.address}</div>
                        <div>
                          {item.userDetail.city}, {item.userDetail.state},{" "}
                          {item.userDetail.country}, {item.userDetail.zipcode}
                        </div>
                        <div>{item.userDetail.phone}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>quantity: {item.productDetail.quantity}</div>
                    <div>
                      <div>Method: COD</div>
                      <div>Payment: Panding</div>
                      <div>Date: 12/1/2023</div>
                    </div>
                  </div>
                  <div>${item.totalPrice}</div>
                  <div>
                    <select
                      defaultValue={item.status}
                      onChange={(e) => handleStatus(e, item)}
                      className="border-1 border-neutral-500 py-1 px-2 rounded-[8px]"
                      name=""
                      id=""
                    >
                      <option value="Oreder-placed">Oreder-placed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Deliveried">Deliveried</option>
                    </select>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-2xl font-medium">No Orders Yet</div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        <div className="space-y-3 shadow-2xl px-5 py-5 rounded-[5px]">
          <div className="text-2xl font-medium">
            Login to <span className="font-bold">AHR</span> admin area
          </div>
          <div className=" space-y-3">
            <div className="text-xl font-medium">Enter Username</div>
            <input
              value={Username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-[300] py-1 px-2 border-1 border-neutral-400 rounded-xl"
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div className=" space-y-3">
            <div className="text-xl font-medium">Enter password</div>
            <input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-[300] py-1 px-2 border-1 border-neutral-400 rounded-xl"
              type="text"
              placeholder="Password"
            />
          </div>
          <div className="justify-self-center">
            <button
              onClick={handleLog}
              className="text-2xl py-2 px-5 bg-black text-white rounded-2xl cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
