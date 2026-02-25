import React, {useEffect, useState} from 'react';
import {
    ArrowLeft, Search, Plus, Edit2, Trash2, Users, ShieldCheck, X
} from 'lucide-react';

import '../../Style/Employee.css';
import axios from "axios";

// Dados Iniciais (Mock)
const INITIAL_EMPLOYEES = [
    { id: 1, name: 'Carlos Silva', email: 'carlos@mtgmanager.com', role: 'Gerente', status: 'Ativo' },
    { id: 2, name: 'Ana Souza', email: 'ana@mtgmanager.com', role: 'Vendedor', status: 'Ativo' },
    { id: 3, name: 'Marcos Dias', email: 'marcos@mtgmanager.com', role: 'Estoquista', status: 'Inativo' },
    { id: 4, name: 'Julia Martins', email: 'julia@mtgmanager.com', role: 'Vendedor', status: 'Ativo' },
];

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Controle do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null); // null = Adicionando Novo
    const [formData, setFormData] = useState({ name: '', email: '', cpf: '', role_id:2});



    // Navegação
    const handleGoBack = () => { window.location.href = '/admin/home'; };

    // Abrir Modal para ADICIONAR
    const handleAddNew = () => {
        setEditingEmployee(null);
        setFormData({ name: '', email: '', cpf: '', role_id: 2});
        setIsModalOpen(true);
    };

    async function handleFetchEmployees()
    {
        const response = await axios.get("/api/user/listByRole",
            {params:
                    {role_id: 2}
            })
        setEmployees(response.data);
    }

    // Abrir Modal para EDITAR
    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setFormData({ ...employee });
        setIsModalOpen(true);
    };

    // Excluir
    const handleDelete = async (id) => {

        if (window.confirm('Tem certeza que deseja remover este funcionário?')) {
            await axios.post("/api/user/delete",id,{
                headers: { "Content-Type": "application/json" }})
            await handleFetchEmployees();
        }
    };

    // Salvar (Adicionar ou Atualizar)
    const handleSave = async (e) => {
        e.preventDefault();
        if (editingEmployee) {

            const response = await axios.post("/api/user/update", formData)


        } else {

            const response = await axios.post("/api/auth/register",formData)

        }
        await handleFetchEmployees();
        setIsModalOpen(false);
    };

    // Filtragem
    const filteredEmployees = employees.filter(emp =>
        emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    useEffect(() => {
        handleFetchEmployees()
    }, []);


    return (
        <div className="employees-container">

            {/* Topo */}
            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={18} /> Voltar ao Dashboard
                </button>
            </nav>

            {/* Header com Botão Adicionar ao lado */}
            <header className="page-header">
                <div>
                    <h1>Gerenciamento de Equipe</h1>
                    <p>Adicione, edite ou remova acessos dos seus funcionários.</p>
                </div>
                <button className="btn-add-primary" onClick={handleAddNew}>
                    <Plus size={20} /> Novo Funcionário
                </button>
            </header>

            {/* KPIs Grid */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Total de Colaboradores</h3>
                        <p className="kpi-value">{employees.length}</p>
                    </div>
                    <div className="kpi-icon"><Users size={28}/></div>
                </div>

                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Ativos no Sistema</h3>
                        <p className="kpi-value">{employees.filter(e => e.status === 'Ativo').length}</p>
                    </div>
                    <div className="kpi-icon" style={{background: 'rgba(16, 185, 129, 0.15)', color: '#10b981'}}>
                        <ShieldCheck size={28}/>
                    </div>
                </div>
            </div>

            {/* Tabela */}
            <div className="table-card">
                <div className="table-header-row">
                    <h2 style={{margin:0, fontSize:'1.2rem'}}>Lista de Funcionários</h2>
                    <div style={{position:'relative'}}>
                        <Search size={16} style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#94a3b8'}}/>
                        <input
                            className="search-field"
                            placeholder="Buscar por nome ou email..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="emp-table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th style={{paddingLeft:"30px"}}>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map(emp => (
                            <tr key={emp.id}>
                                <td style={{fontWeight:600}}>{emp.name}</td>
                                <td style={{color:'#94a3b8'}}>{emp.email}</td>
                                <td><span className="role-badge">{emp.cpf}</span></td>

                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-icon edit" onClick={() => handleEdit(emp)} title="Editar">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="btn-icon delete" onClick={() => handleDelete(emp.id)} title="Excluir">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{textAlign:'center', padding:'3rem', color:'#64748b'}}>
                                Nenhum funcionário encontrado.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL DE ADICIONAR/EDITAR --- */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleSave}>
                            <div className="modal-header">
                                <h2 style={{margin:0, fontSize:'1.2rem'}}>
                                    {editingEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
                                </h2>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{background:'none', border:'none', cursor:'pointer', color:'#fff'}}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nome Completo</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email de Acesso</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>

                                    <div className="form-group">
                                        <label>CPF</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            required
                                            maxLength={14}

                                            value={formData.cpf}
                                            onChange={(e) =>
                                                setFormData({ ...formData, cpf: e.target.value })
                                            }
                                        />
                                    </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn-save">
                                    {editingEmployee ? 'Salvar Alterações' : 'Cadastrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Employees;