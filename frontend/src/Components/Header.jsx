import logo from "../assets/Logo.png";

function Header() {
    return (
        <header className="d-flex align-items-center px-4 py-3 border-bottom bg-black">


            <div style={{ width: "100px" }}>
                <img
                    src={logo}
                    alt="Logo MTGManager"
                    style={{ height: "80px" }}
                />
            </div>


            <div className="flex-grow-1 text-center">
                <h1 className="h4 fw-bold text-light mb-0">
                    MTGManager
                </h1>
                <small className="text-secondary">
                    Gerenciamento de coleções
                </small>
            </div>

            {/* Coluna direita vazia (balanceamento) */}
            <div style={{ width: "100px" }} />
        </header>
    );
}

export default Header;
