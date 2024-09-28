import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const ProductList = ({ onEdit }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const response = await axios.get(`${API_URL}/api/products`);
    setProdutos(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/products/${id}`);
    fetchProdutos();
  };

  return (
    <div className="p-6">
      <button
        onClick={onEdit}
        className="mb-4 bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600"
      >
        Cadastrar Novo Produto
      </button>
      <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-teal-100">
            <th className="py-2 px-4 border-b border-teal-300 text-left">Nome</th>
            <th className="py-2 px-4 border-b border-teal-300 text-left">Valor</th>
            <th className="py-2 px-4 border-b border-teal-300 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="hover:bg-teal-50">
              <td className="py-2 px-4 border-b border-teal-300">{produto.name}</td>
              <td className="py-2 px-4 border-b border-teal-300">{produto.price}</td>
              <td className="py-2 px-4 border-b border-teal-300">
                <button
                  onClick={() => onEdit(produto)}
                  className="bg-teal-500 text-white font-semibold py-1 px-2 rounded hover:bg-teal-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}