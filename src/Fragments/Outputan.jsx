import React from "react";
import { Fragment } from "react";
import { useState } from "react";

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

export default Outputan;
