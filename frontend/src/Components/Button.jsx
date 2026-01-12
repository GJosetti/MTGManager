// Button.jsx
import React from "react";

function Button({ onClick, children, type = "button" }) {
    const buttonStyle = {
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#2ecc71", // verde bonito
        color: "white",
        cursor: "pointer",
        fontSize: "1em",
        transition: "background-color 0.2s, transform 0.2s",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#27ae60")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2ecc71")}
        >
            {children}
        </button>
    );
}

export default Button;