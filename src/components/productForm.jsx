import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const ProductForm = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availableForSale, setAvailableForSale] = useState(true);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setAvailableForSale(product.availableForSale);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newProduct = { name, description, price, availableForSale: availableForSale ?? true };
    if (product && product.id) {
      await axios.put(`${API_URL}/api/products/${product.id}`, newProduct);
    } else {
      await axios.post(`${API_URL}/api/products`, newProduct);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="border mt-11 p-6 bg-white rounded-lg shadow-md max-w-[600px] mx-auto">
      <div className="mb-4">
        <label className="font-urbanist block text-teal-500 font-semibold mb-1">Nome do produto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg py-2 px-4 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="font-urbanist block text-teal-500 font-semibold mb-1">Descrição</label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded-lg py-2 px-4 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="font-urbanist block text-teal-500 font-semibold mb-1">Valor</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border border-gray-300 rounded-lg py-2 px-4 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="font-urbanist block text-teal-500 font-semibold mb-1">Disponível para venda</label>
        <select
          value={availableForSale}
          onChange={(e) => setAvailableForSale(e.target.value === "true")}
          className="border border-gray-300 rounded-lg py-2 px-4 w-full"
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      <button
        type="submit"
        className="font-urbanist text-white font-semibold py-2 px-4 rounded mr-2
        bg-gradient-to-tl from-green-500 to-teal-500 
        hover:bg-gradient-to-br transition-all duration-500 ease-in-out"
      >
        Salvar
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="font-urbanist bg-gray-300 text-black font-semibold py-2 px-4 rounded hover:bg-gray-400"
      >
        Cancelar
      </button>
    </form>
  );
}


