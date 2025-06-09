import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
  endereco?: string;
};

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  function carregarClientes() {
    fetch("http://localhost:3001/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch("http://localhost:3001/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setMostrarModal(false);
        setFormData({ nome: "", telefone: "", email: "", endereco: "" });
        carregarClientes();
      })
      .catch((err) => alert("Erro ao cadastrar cliente: " + err.message));
  }

  function excluirCliente(id: number) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (!confirmar) return;

    fetch(`http://localhost:3001/clientes/${id}`, {
      method: "DELETE",
    })
      .then(() => carregarClientes())
      .catch((err) => alert("Erro ao excluir cliente: " + err.message));
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Novo Cliente
        </button>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Telefone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Endereço</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{cliente.nome}</td>
                <td className="px-4 py-2 border">{cliente.telefone}</td>
                <td className="px-4 py-2 border">{cliente.email || "-"}</td>
                <td className="px-4 py-2 border">{cliente.endereco || "-"}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => excluirCliente(cliente.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑 Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">👤 Novo Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email (opcional)"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="endereco"
                placeholder="Endereço (opcional)"
                value={formData.endereco}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
