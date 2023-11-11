import React from "react";
import { Fragment } from "react";

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

export default Inputan;
