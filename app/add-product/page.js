"use client";
import { useState, useRef, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import MyContext from "../context/MyContext";
function Page() {
  let session = useContext(MyContext);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const myForm = useRef();
  const [Images, setImages] = useState([{ url: "" }]);
  const [Rams, setRams] = useState([]);
  const [Storages, setStorages] = useState([]);
  const handleImageadd = () => {
    let newAdd = { url: "" };
    setImages([...Images, newAdd]);
  };
  const handleLog = () => {
    if (Username == "Abdullah" && Password == "ABD@1234") {
      let DATA = { username: Username, password: Password };
      localStorage.setItem("loged", JSON.stringify(DATA));
      session.setsession(DATA);
    }
  };
  const handleImagedata = (e, index) => {
    setImages((images) => {
      return images.map((item, ind) => {
        if (ind == index) {
          return { url: e.target.value };
        } else {
          return item;
        }
      });
    });
  };
  const handleRam = (Rame) => {
    let des = Rams.includes(Rame);
    if (des) {
      setRams(Rams.filter((num) => num !== Rame));
    } else {
      setRams([...Rams, Rame]);
    }
  };
  const handleStorage = (Store) => {
    let des = Storages.includes(Store);
    if (des) {
      setStorages(Storages.filter((num) => num !== Store));
    } else {
      setStorages([...Storages, Store]);
    }
  };
  const onsubmit = async (data) => {
    if (Rams.length !== 0 || Storages.length !== 0) {
      if (Images[0].url) {
        let newProduct = {
          ...data,
          ...{ images: Images },
          ...{ ram: Rams },
          ...{ storage: Storages },
        };
        let res = await fetch("/api/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
        let fin = await res.json();
        myForm.current.reset();
        setRams([]);
        setStorages([]);
        setImages([{ url: "" }]);
        toast.success(fin.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error("Please Add at least one image", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      toast.error("Please select ram and Storage", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  if (session.session) {
    return (
      <div className="2xl:w-[1532px] w-[100%] justify-self-center">
        <form
          ref={myForm}
          className=" md:w-[768px] w-[100%] py-10 px-5 justify-self-center"
          onSubmit={handleSubmit((e) => {
            onsubmit(e);
          })}
        >
          <div>
            <div className="text-2xl font-medium pb-5">Upload Images</div>
            <div className="flex flex-col gap-3">
              <div>(Note: At least 1 image is required)</div>
              {Images.length !== 0 &&
                Images.map((item, index) => {
                  return (
                    <input
                      value={item.url}
                      onChange={(e) => handleImagedata(e, index)}
                      key={index}
                      type="url"
                      className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                      placeholder="Enter Image URL"
                    />
                  );
                })}
              <div>
                <button
                  type="button"
                  onClick={handleImageadd}
                  className="py-1 px-3 bg-black cursor-pointer text-white font-medium rounded-2xl"
                >
                  +Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-medium py-5">Product Title</div>
            <div className="flex flex-col gap-3">
              <input
                {...register("name", {
                  required: { value: true, message: "Field required" },
                })}
                type="text"
                className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                placeholder="Enter Prduct Title"
              />
            </div>
          </div>
          <div>
            <div className="text-2xl font-medium py-5">Product Description</div>
            <div className="flex flex-col gap-3">
              <textarea
                {...register("description", {
                  required: { value: true, message: "Field required" },
                })}
                defaultValue="Enter Description"
                className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                name=""
                id=""
              ></textarea>
            </div>
          </div>
          <div>
            <div className="flex gap-[2%] relative">
              <div className="w-[32%]">
                <div className="font-medium py-5">Product Brand</div>
                <input
                  {...register("brand", {
                    required: { value: true, message: "Field required" },
                  })}
                  className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                  type="text"
                  placeholder="HP/Dell"
                />
              </div>
              <div className="w-[32%]">
                <div className="font-medium py-5">Product Category</div>
                <input
                  {...register("category", {
                    required: { value: true, message: "Field required" },
                  })}
                  className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                  type="text"
                  placeholder="Gaming/Office"
                />
              </div>
              <div className="w-[32%]">
                <div className="font-medium py-5">Product Processor</div>
                <input
                  {...register("processor", {
                    required: { value: true, message: "Field required" },
                  })}
                  className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                  type="text"
                  placeholder="i7/Ryzen 5"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-medium py-5">Available Ram</div>
            <div className="flex gap-2">
              <button
                onClick={() => handleRam(4)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Rams.includes(4)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                4GB
              </button>
              <button
                onClick={() => handleRam(8)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Rams.includes(8)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                8GB
              </button>
              <button
                onClick={() => handleRam(12)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Rams.includes(12)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                12GB
              </button>
              <button
                onClick={() => handleRam(16)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Rams.includes(16)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                16GB
              </button>
              <button
                onClick={() => handleRam(24)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Rams.includes(24)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                24GB
              </button>
            </div>
          </div>
          <div>
            <div className="text-2xl font-medium py-5">Available Storage</div>
            <div className="flex gap-2">
              <button
                onClick={() => handleStorage(80)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Storages.includes(80)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                80GB
              </button>
              <button
                onClick={() => handleStorage(128)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Storages.includes(128)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                128GB
              </button>
              <button
                onClick={() => handleStorage(256)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Storages.includes(256)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                256GB
              </button>
              <button
                onClick={() => handleStorage(512)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Storages.includes(512)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                512GB
              </button>
              <button
                onClick={() => handleStorage(1024)}
                type="button"
                className={`py-1 px-2 rounded-xl border-1 ${
                  Storages.includes(1024)
                    ? "border-blue-400 bg-blue-100"
                    : "border-neutral-500"
                } transition-all cursor-pointer`}
              >
                1024GB
              </button>
            </div>
          </div>
          <div>
            <div className="flex gap-[3%] relative">
              <div className="w-[48.5%]">
                <div className="font-medium py-5">Price</div>
                <input
                  {...register("price", {
                    required: { value: true, message: "Field Required" },
                  })}
                  className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                  type="number"
                  placeholder="Enter Price"
                />
              </div>
              <div className="w-[48.5%]">
                <div className="font-medium py-5">Discount Price</div>
                <input
                  {...register("discountPrice", {
                    required: { value: true, message: "Field Required" },
                  })}
                  className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                  type="number"
                  placeholder="Enter Discount Price"
                />
              </div>
            </div>
          </div>
          <div className="pt-10 pb-15 flex justify-end">
            <button
              type="submit"
              className="bg-black cursor-pointer py-2 px-10 rounded-2xl  text-white text-2xl font-medium"
            >
              Post
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
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
