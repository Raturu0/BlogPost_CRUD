import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Banner from "./Fragments/Banner";
import Inputan from "./Fragments/Inputan";
import InputanBody from "./Fragments/InputanBody";
import Outputan from "./Fragments/Outputan";
import Line from "./Fragments/Line";

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

        <Line />

        <section id="BLOG">
          <div className=" h-full flex flex-wrap justify-center ">
            <Outputan
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
              key={"2000"}
              title={"Raturu "}
              body={
                "Raturu hobinya bermain game, mobel lejen. hero favorit iritel pernah jadi top jawa tengah iritel. infokan custom by one. Ini juga konten default"
              }
              image={
                "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/04/05/windah-2273767905.jpg"
              }
            />
            <Outputan
              key={"3001"}
              title={"Judul lain "}
              body={"lorem lorem lorem lorem lorem bla"}
              image={
                "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/04/05/windah-2273767905.jpg"
              }
            />
            <Outputan
              key={"4001"}
              title={"Judul lagi "}
              body={"Mau diisi deksripsi apa bang"}
              image={
                "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/04/05/windah-2273767905.jpg"
              }
            />
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
