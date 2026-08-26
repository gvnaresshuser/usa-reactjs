import React, { useRef } from "react";
import CustomInput from "./CustomInput";

const ImperativeHandleExample = () => {
  const ref = useRef();

  const handleFocus = () => {
    ref.current.giveFocus();
  };

  const handleBackground = () => {
    ref.current.changeBackground("red");
  };

  const handleFontSize = () => {
    ref.current.increaseFontSize();
  };

  const handleFontStyle = () => {
    ref.current.changeFontStyle("italic");
  };

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
          useImperativeHandle Hook
        </h1>
      </div>

      <br />

      <CustomInput ref={ref} />

      <br />

      <button onClick={handleFocus}>Focus</button>

      <button onClick={handleBackground}>Change Background</button>

      <button onClick={handleFontSize}>Increase Font Size</button>

      <button onClick={handleFontStyle}>Italic Font</button>
    </>
  );
};

export default ImperativeHandleExample;
