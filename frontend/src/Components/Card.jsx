// Card.jsx
import React, { useState } from "react";

function Card({ title, children }) {
    const [isHover, setIsHover] = useState(false);

    const cardStyle = {
        backgroundColor: "#3498db",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        maxWidth: "300px",
        margin: "10px",
        fontFamily: "Arial, sans-serif",
        transition: "transform 0.2s",
        transform: isHover ? "translateY(-5px)" : "none",
        cursor: isHover ? "pointer" : "default",
    };

    const titleStyle = {
        margin: "0 0 10px 0",
        fontSize: "1.5em",
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {title && <h2 style={titleStyle}>{title}</h2>}
            {children}
        </div>
    );
}

export default Card;