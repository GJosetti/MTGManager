function Sidebar({ onSelect }) {
    return (
        <div className="d-flex flex-column p-3 border-end text-light"
             style={{ width: "220px", minHeight: "100vh",backgroundColor: "#020617"}}>

            <h5 className="fw-bold mb-4">Admin</h5>

            <button
                className="btn btn-outline-light text-start mb-2"
                onClick={() => onSelect("funcionarios")}
            >
                👥 Funcionários
            </button>

            <button
                className="btn btn-outline-light text-start mb-2"
                onClick={() => onSelect("estoque")}
            >
                📦 Estoque
            </button>

            <button
                className="btn btn-outline-light text-start"
                onClick={() => onSelect("vendas")}
            >
                💰 Vendas
            </button>
        </div>
    );
}

export default Sidebar;