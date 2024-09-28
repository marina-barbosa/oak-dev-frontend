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
    const newProduct = { name, description, price, availableForSale };
    if (product) {
      await axios.put(`${API_URL}/api/products/${product.id}`, newProduct);
    } else {
      await axios.post(`${API_URL}/api/products`, newProduct);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-teal-600 font-semibold mb-1">Nome do produto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-teal-300 rounded-lg py-2 px-4 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-teal-600 font-semibold mb-1">Descrição</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-teal-300 rounded-lg py-2 px-4 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-teal-600 font-semibold mb-1">Valor</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border border-teal-300 rounded-lg py-2 px-4 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-teal-600 font-semibold mb-1">Disponível para venda</label>
        <select
          value={availableForSale}
          onChange={(e) => setAvailableForSale(e.target.value === "true")}
          className="border border-teal-300 rounded-lg py-2 px-4 w-full"
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600 mr-2"
      >
        Salvar
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-300 text-black font-semibold py-2 px-4 rounded hover:bg-gray-400"
      >
        Cancelar
      </button>
    </form>
  );
}


