import { useState } from "react";
import Sidebar from "../../Components/Sidebar.jsx";

function AdminHome() {
    const [section, setSection] = useState("funcionarios");

    function renderContent() {
        switch (section) {
            case "funcionarios":
                return <h2 className={"text-light"}>Gerenciamento de Funcionários</h2>;
            case "estoque":
                return <h2 className={"text-light"}>Controle de Estoque</h2>;
            case "vendas":
                return <h2 className={"text-light"}>Relatório de Vendas</h2>;
            default:
                return <h2 className={"text-light"}>Bem-vindo, Admin</h2>;
        }
    }

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar onSelect={setSection} />

            {/* Conteúdo principal */}
            <main className="p-4 flex-grow-1">
                {renderContent()}
            </main>
        </div>
    );
}

export default AdminHome;