// TextInput.jsx
import React from "react";

function TextInput({ value, onChange, placeholder }) {
    const inputStyle = {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "1em",
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "10px",
    };

    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={inputStyle}
        />
    );
}

export default TextInput;