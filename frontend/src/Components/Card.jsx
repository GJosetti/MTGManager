function Card({ title, children, className = "", style }) {
    return (
        <div className={`card ${className}`} style={style}>
            {title && (
                <div className="card-header text-center fw-bold fs-4">
                    {title}
                </div>
            )}

            <div className="card-body">{children}</div>
        </div>
    );
}

export default Card;