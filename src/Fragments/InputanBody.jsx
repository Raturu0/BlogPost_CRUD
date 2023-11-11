import React from "react";
import { Fragment } from "react";

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

export default InputanBody;
