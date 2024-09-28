import React, { useEffect, useState } from 'react';
import { IconTrashX, IconPencil, IconXboxX } from '@tabler/icons-react';
import axios from 'axios';

const API_URL = "http://localhost:8080"

export const ProductList = ({ onEdit }) => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleProdutoClick = async (id) => {
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    setSelectedProduto(response.data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduto(null);
  };

  return (
    <div className="p-6 max-w-[800px] mx-auto ">

      <div className='w-full text-center'>
        <button
          onClick={onEdit}
          className="font-urbanist mb-5 text-white font-semibold py-4 px-4 rounded
          bg-gradient-to-tl from-green-500 to-teal-500
          hover:bg-gradient-to-br transition-all duration-500 ease-in-out"
        >
          Cadastrar Novo Produto
        </button>
      </div>

      <div className="border border-gray-300 rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="font-urbanist text-lg">
            <tr className="bg-gray-800 text-white">
              <th className="py-4 px-4 text-left md:ps-11">Nome</th>
              <th className="py-4 px-4 text-left">Valor</th>
              <th className="py-4 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-600">
                  Nenhum produto cadastrado.
                </td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr key={produto.id} className="hover:bg-teal-50">
                  <td
                    className="py-2 px-4 border-b border-gray-300 md:ps-11 cursor-pointer hover:text-teal-600"
                    onClick={() => handleProdutoClick(produto.id)}
                  >{produto.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300">R$ {produto.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    <button
                      onClick={() => onEdit(produto)}
                      className="bg-teal-500 text-white font-semibold py-1 px-2 rounded hover:bg-teal-600 mr-2
                                  bg-gradient-to-tl from-green-500 to-teal-500
                                  hover:bg-gradient-to-br transition-all duration-500 ease-in-out"
                    >
                      <IconPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(produto.id)}
                      className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600"
                    >
                      <IconTrashX />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {isModalOpen && selectedProduto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
            >
              <IconXboxX size={28} />
            </button>

            <h2 className="text-xl font-bold mb-4">{selectedProduto.name}</h2>
            <p><strong>Preço:</strong> R$ {selectedProduto.price.toFixed(2)}</p>
            <p><strong>Descrição:</strong> {selectedProduto.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}