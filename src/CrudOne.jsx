import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Banner = () => {
  return (
    <Fragment>
      <section id="BANNER">
        <div className="w-full h-32 bg-gray-500 flex flex-wrap justify-center items-center">
          <h1 className="font-bold text-3xl ">BLOG POST CRUD</h1>
        </div>
      </section>
    </Fragment>
  );
};

const Inputan = (props) => {
  const { placeholder, value, onChangeText, styled, type } = props;
  return (
    <Fragment>
      <section id="INPUTAN">
        <div className="w-full h-full bg-gray-400 px-5 sm:w-[75%] sm:mx-auto lg:w-[60%]">
          <label htmlFor="title">
            <h1 className="font-bold text-blue-600 text-xl">{type}</h1>
          </label>
          <input
            required
            type="text"
            className={`w-[100%] p-3 border-2 border-solid border-white rounded-lg ${styled}`}
            placeholder={placeholder}
            value={value}
            onChange={onChangeText}
          />
        </div>
      </section>
    </Fragment>
  );
};

const InputanBody = (props) => {
  const { placeholder, onChangeText, value } = props;
  return (
    <Fragment>
      <section id="INPUTAN-DESC">
        <div className="w-full h-full px-5 sm:mx-auto sm:w-[75%] lg:w-[60%]">
          <label htmlFor="image">
            <h1 className="text-blue-600 font-bold text-xl">Body</h1>
          </label>
          <textarea
            required
            name="body"
            id="body"
            cols="40"
            rows="10"
            className="w-full p-3 rounded-lg"
            placeholder={placeholder}
            value={value}
            onChange={onChangeText}
          ></textarea>
        </div>
      </section>
    </Fragment>
  );
};

const Outputan = (props) => {
  const { image, title, body, onDeleted, onSelected } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clickMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Fragment>
      <div className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] mx-auto bg-white rounded-lg p-2 my-2 relative">
        <section id="IMAGE">
          <div className="">
            <img src={image} alt="" className="w-full h-full" />
          </div>
        </section>

        <h1 className="font-bold text-2xl text-center">{title}</h1>
        <a href="https://www.google.com">
          <h1 className="text-gray-600 text-md text-center px-3 hover:text-blue-700 line-clamp-3">
            {body}
          </h1>
        </a>
        {!isMenuOpen && (
          <div
            id="MENU"
            className="absolute right-0 top-1 font-bold hover:cursor-pointer w-[7%] hover:opacity-50 "
            onClick={clickMenu}
          >
            <img
              src="https://cdn.icon-icons.com/icons2/2954/PNG/512/three_dots_vertical_menu_icon_184615.png"
              alt=""
              className="w-full h-full text-white bg-white rounded-full"
            />
          </div>
        )}
        {isMenuOpen && (
          <div
            id="MENU"
            className="absolute -right-1 top-0 font-bold hover:cursor-pointer w-[7%] hover:opacity-50 "
            onClick={clickMenu}
          >
            <h1 className="font-bold text-xl">X</h1>
          </div>
        )}
        {/* jika isMenuOpen true tampilkan menu dibawah */}
        {isMenuOpen && (
          <div className="absolute right-2 top-10 bg-white border-2 border-solid border-black shadow-md hover:cursor-pointer">
            <ul className="">
              <div
                id="UPLOAD-TEKS"
                className="bg-green-600 p-2 hover:bg-green-800"
                onClick={onSelected}
              >
                <li className="text-black hover:text-gray-800 font-bold">
                  Upload
                </li>
              </div>
              <div
                id="DELETE-TEKS"
                className="bg-red-600 p-2 hover:bg-red-800 hover:cursor-pointer"
                onClick={onDeleted}
              >
                <li className="text-black font-bold">Delete</li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const CrudOne = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [textButton, setTextButton] = useState("SAVE");
  const [blogs, setBlogs] = useState([]);
  const [label, setLabel] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("http://192.168.1.28:3004/posts").then((res) => {
      console.log("res get = ", res.data);
      setBlogs(res.data);
    });
  };

  const deleteBlog = (item) => {
    axios.delete(`http://192.168.1.28:3004/posts/${item.id}`).then((res) => {
      console.log("res delete = ", res);
      getData();
    });
  };

  const button = () => {
    const data = {
      image,
      title,
      body,
    };

    if (textButton == "SAVE") {
      if (title == "" || body == "" || image == "") {
        alert("please fill the field");
      } else {
        axios.post("http://192.168.1.28:3004/posts", data).then((res) => {
          console.log("res post = ", res.data);
        });
        alert("succss add blog");
      }
    } else if (textButton == "UPDATE") {
      axios.put(`http://192.168.1.28:3004/posts/${label.id}`, data);
      setTextButton("SAVE");
      setTitle("");
      setBody("");
      setImage("");
      alert("success update blog");
      getData();
    }
  };

  const picked = (item) => {
    console.log("ini blog terpilih", item);
    setTextButton("UPDATE");
    setTitle(item.title);
    setBody(item.body);
    setImage(item.image);
    setLabel(item); // dia ngeset tabel mengirim paramter item yang isinya title, body, image, ditangkap label karena usestate defaulnya adalah {}
  };

  return (
    <Fragment>
      <Banner />

      <section className="bg-gray-400 py-14">
        <form action="">
          <Inputan
            placeholder={"add link image"}
            type={"Image"}
            value={image}
            onChangeText={(event) => {
              setImage(event.target.value);
            }}
            styled={"mb-5"}
          />
          <Inputan
            placeholder={"add title"}
            type={"Title"}
            value={title}
            onChangeText={(event) => {
              setTitle(event.target.value);
            }}
            styled={"mb-5 font-bold"}
          />
          <InputanBody
            placeholder={"add body"}
            value={body}
            onChangeText={(event) => {
              setBody(event.target.value);
            }}
          />
          <section id="BUTTON">
            <div className="w-full h-full px-5 sm:w-[75%] sm:mx-auto lg:w-[60%] ">
              <button
                type="submit"
                onClick={button}
                className="w-full bg-blue-600 hover:bg-blue-800 rounded-lg py-2 mt-2"
              >
                <h1 className="font-bold text-white text-md">{textButton}</h1>
              </button>
            </div>
          </section>
        </form>

        <section id="LINE">
          <div className="w-[90%] mx-auto h-0.5 bg-black my-20"></div>
        </section>

        <section id="BLOG">
          <div className=" h-full flex flex-wrap justify-center ">
            {/* <Outputan
              key={"1000"}
              title={"Ahmad "}
              body={
                "Ahmad nama panjangnya ahmad aziz fauzi dengan nickname Raturu0, gas mabar. Konten ini default ya jadi ngak bisa dihapus dan upload "
              }
              image={
                "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/04/05/windah-2273767905.jpg"
              }
            />
            <Outputan
              key={"1001"}
              title={"Raturu "}
              body={
                "Raturu hobinya bermain game, mobel lejen. hero favorit iritel pernah jadi top jawa tengah iritel. infokan custom by one. Ini juga konten default"
              }
              image={
                "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/04/05/windah-2273767905.jpg"
              }
            /> */}
            {blogs
              .map((blog) => (
                <Outputan
                  key={blog.id}
                  title={blog.title}
                  body={blog.body}
                  image={blog.image}
                  onDeleted={() => {
                    deleteBlog(blog);
                  }}
                  onSelected={() => {
                    picked(blog);
                  }}
                />
              ))
              .reverse()}
          </div>
        </section>
      </section>
    </Fragment>
  );
};

export default CrudOne;
