import React from "react";


const ErrorBox = ({ error }) => {

    if (!error) return null;

    return (
        <div style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px"
        }}>
                {error}

        </div>

    );
};

export default ErrorBox;
