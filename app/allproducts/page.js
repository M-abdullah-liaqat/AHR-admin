"use client";
import useSWR from "swr";
import { LuTrash2 } from "react-icons/lu";
import { useState, useEffect, useContext } from "react";
import MyContext from "../context/MyContext";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Page() {
  let session = useContext(MyContext);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [allProducts, setallProducts] = useState([]);
  const { data, error, isLoading } = useSWR(`/api/add`, fetcher, {
    refreshInterval: 300000, // Auto refresh every 5 seconds
    revalidateOnFocus: true, // Refetch when tab is active
    dedupingInterval: 2000, // Avoid multiple requests in 2s
  });
  // const allProducts = data;
  console.log(allProducts);
  useEffect(() => {
    if (data) {
      setallProducts(data);
    }
  }, [data]);
  const handleDelete = async (item, index) => {
    setallProducts(allProducts.filter((item, ind) => ind !== index));
    let res = await fetch("/api/add", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item._id }),
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
      <div className="min-h-screen min-w-screen flex items-center justify-center text-2xl font-medium">
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
          {allProducts.length !== 0 ? (
            allProducts.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-2 border-neutral-500 rounded-[5px] bg-neutral-100 py-3 flex justify-between gap-3 px-4 text-neutral-800"
                >
                  <div className="flex  items-center gap-8">
                    <div className="w-[100px] h-[100px] ">
                      <img
                        className="w-[100%] h-[100%] object-cover"
                        src={item.images[0].url}
                        alt=""
                      />
                    </div>
                    <div className=" space-y-3">
                      <div>{item.name}</div>
                      <div className="flex gap-2 items-center">
                        <div>Ram: </div>
                        <div className="flex gap-2 items-center">
                          {item.ram &&
                            item.ram.map((minItem, minIndex) => {
                              return (
                                <button
                                  key={minIndex}
                                  className={`py-1 px-2 rounded-xl border-1 border-neutral-500 transition-all cursor-pointer`}
                                >
                                  {minItem}gb
                                </button>
                              );
                            })}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div>Storage: </div>
                        <div className="flex gap-2 items-center">
                          {item.storage &&
                            item.storage.map((minItem, minIndex) => {
                              return (
                                <button
                                  key={minIndex}
                                  className={`py-1 px-2 rounded-xl border-1 border-neutral-500 transition-all cursor-pointer`}
                                >
                                  {minItem}gb
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>{item.category}</div>
                    <div>{item.brand}</div>
                  </div>
                  <div>${item.discountPrice}</div>
                  <div>
                    <button className="cursor-pointer">
                      <LuTrash2
                        onClick={(e) => handleDelete(item, index)}
                        className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] cursor-pointer "
                        color="#5a5a5a"
                      />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-2xl font-medium">
              No products please post Products
            </div>
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
