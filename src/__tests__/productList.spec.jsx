import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import { ProductList } from '../components/productList';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('Componente ProductList', () => {
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar a lista de produtos corretamente', async () => {
    const produtosMock = [
      { id: 1, name: 'Produto A', price: 50.0, description: 'Descrição A' },
      { id: 2, name: 'Produto B', price: 100.0, description: 'Descrição B' },
    ];

    axios.get.mockResolvedValueOnce({ data: produtosMock });

    render(<ProductList onEdit={mockOnEdit} />);

    await waitFor(() => {
      expect(screen.getByText('Produto A')).toBeInTheDocument();
      expect(screen.getByText('Produto B')).toBeInTheDocument();
    });

    expect(screen.getByText('R$ 50.00')).toBeInTheDocument();
    expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
  });

  test('deve exibir mensagem "Nenhum produto cadastrado" quando não houver produtos', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<ProductList onEdit={mockOnEdit} />);

    await waitFor(() => {
      expect(screen.getByText('Nenhum produto cadastrado.')).toBeInTheDocument();
    });
  });

  test('deve chamar onEdit ao clicar no botão de editar', async () => {
    const produtosMock = [{ id: 1, name: 'Produto A', price: 50.0, description: 'Descrição A' }];

    axios.get.mockResolvedValueOnce({ data: produtosMock });

    render(<ProductList onEdit={mockOnEdit} />);

    await waitFor(() => {
      expect(screen.getByText('Produto A')).toBeInTheDocument();
    });

    const botaoEditar = screen.getByRole('button', { name: /editar/i });
    fireEvent.click(botaoEditar);

    expect(mockOnEdit).toHaveBeenCalledWith(produtosMock[0]);
  });

  test('deve excluir o produto ao clicar no botão de excluir', async () => {
    const produtosMock = [{ id: 1, name: 'Produto A', price: 50.0, description: 'Descrição A' }];

    axios.get.mockResolvedValueOnce({ data: produtosMock });
    axios.delete.mockResolvedValueOnce({});

    render(<ProductList onEdit={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('Produto A')).toBeInTheDocument();
    });

    const botaoExcluir = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(botaoExcluir);

    axios.get.mockResolvedValueOnce({ data: [] });

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/products/1');
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(screen.queryByText('Produto A')).not.toBeInTheDocument();
    });
  });

  test('deve abrir o modal ao clicar em um produto da lista', async () => {
    const produtosMock = [{ id: 1, name: 'Produto A', price: 50.0, description: 'Descrição A' }];

    axios.get.mockResolvedValueOnce({ data: produtosMock });
    axios.get.mockResolvedValueOnce({ data: produtosMock[0] });

    render(<ProductList onEdit={mockOnEdit} />);

    await waitFor(() => {
      expect(screen.getByText('Produto A')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Produto A'));

    const modalContent = await waitFor(() => screen.getByTestId('modal-content'));

    expect(within(modalContent).getByText(/Descrição:/)).toBeInTheDocument();
    expect(within(modalContent).getByText(/Descrição A/)).toBeInTheDocument();
    expect(within(modalContent).getByText(/Preço:/)).toBeInTheDocument();
    expect(within(modalContent).getByText(/R\$ 50.00/)).toBeInTheDocument();
  });

  test('deve fechar o modal ao clicar no botão de fechar', async () => {
    const produtosMock = [{ id: 1, name: 'Produto A', price: 50.0, description: 'Descrição A' }];

    axios.get.mockResolvedValueOnce({ data: produtosMock });
    axios.get.mockResolvedValueOnce({ data: produtosMock[0] });

    render(<ProductList onEdit={mockOnEdit} />);

    await waitFor(() => {
      expect(screen.getByText('Produto A')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Produto A'));

    const modalContent = await waitFor(() => screen.getByTestId('modal-content'));
    expect(within(modalContent).getByText(/Descrição:/)).toBeInTheDocument();
    expect(within(modalContent).getByText(/Descrição A/)).toBeInTheDocument();

    const botaoFechar = within(modalContent).getByRole('button', { name: /fechar/i });
    fireEvent.click(botaoFechar);

    await waitFor(() => {
      expect(screen.queryByText('Descrição: Descrição A')).not.toBeInTheDocument();
    });
  });
});
