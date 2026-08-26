import React, { useRef, useImperativeHandle, forwardRef } from "react";

const CustomInput = forwardRef((props, ref) => {
  const innerRef = useRef();

  useImperativeHandle(ref, () => ({
    // Focus the input
    giveFocus: () => {
      innerRef.current.focus();
    },

    // Change background color
    changeBackground: (color) => {
      innerRef.current.style.backgroundColor = color;
    },

    // Increase font size
    increaseFontSize: () => {
      const currentSize = parseInt(
        window.getComputedStyle(innerRef.current).fontSize,
      );

      innerRef.current.style.fontSize = `${currentSize + 2}px`;
    },

    // Change font style
    changeFontStyle: (style) => {
      innerRef.current.style.fontStyle = style;
    },
  }));

  return (
    <input
      ref={innerRef}
      placeholder="Enter text"
      style={{
        padding: "10px",
        margin: "10px",
        border: "1px solid gray",
      }}
    />
  );
});

export default CustomInput;
