function TextInput({ type = "text", value, onChange, placeholder }) {
    return (
        <input
            type={type}
            className="form-control mb-3"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default TextInput;