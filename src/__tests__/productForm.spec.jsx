import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { ProductForm } from '../components/productForm';
import '@testing-library/jest-dom';
jest.mock('axios');


describe('Componente ProductForm', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o formulário corretamente', () => {
    const { getByLabelText, getByText } = render(<ProductForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    expect(getByLabelText(/nome do produto/i)).toBeInTheDocument();
    expect(getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(getByLabelText(/valor/i)).toBeInTheDocument();
    expect(getByLabelText(/disponível para venda/i)).toBeInTheDocument();
    expect(getByText(/salvar/i)).toBeInTheDocument();
    expect(getByText(/cancelar/i)).toBeInTheDocument();
  });

  test('deve chamar onSave ao submeter o formulário', async () => {
    axios.post.mockResolvedValueOnce({ data: {} }); // Simula uma resposta bem-sucedida do POST

    const { getByLabelText, getByText } = render(<ProductForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    fireEvent.change(getByLabelText(/nome do produto/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(getByLabelText(/descrição/i), { target: { value: 'Descrição do Produto Teste' } });
    fireEvent.change(getByLabelText(/valor/i), { target: { value: '100' } });
    fireEvent.change(getByLabelText(/disponível para venda/i), { target: { value: 'true' } });

    fireEvent.click(getByText(/salvar/i));

    await waitFor(() => expect(mockOnSave).toHaveBeenCalled());
  });

  test('deve chamar onCancel ao clicar no botão cancelar', () => {
    const { getByText } = render(<ProductForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    fireEvent.click(getByText(/cancelar/i));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('deve preencher os campos com dados do produto existente', () => {
    const existingProduct = {
      name: 'Produto Existente',
      description: 'Descrição do Produto Existente',
      price: '150',
      availableForSale: true,
    };

    const { getByLabelText } = render(<ProductForm product={existingProduct} onSave={mockOnSave} onCancel={mockOnCancel} />);

    expect(getByLabelText(/nome do produto/i).value).toBe('Produto Existente');
    expect(getByLabelText(/descrição/i).value).toBe('Descrição do Produto Existente');
    expect(getByLabelText(/valor/i).value).toBe('150');
    expect(getByLabelText(/disponível para venda/i).value).toBe('true');
  });
});
