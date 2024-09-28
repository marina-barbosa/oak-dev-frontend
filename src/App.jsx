import { useState } from "react";
import { ProductList } from './components/productList';
import { ProductForm } from './components/productForm';


function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleSave = () => {
    setIsFormVisible(false);
    setEditingProduct(null);
  };

  return (
    <div>
      {isFormVisible ? (
        <ProductForm product={editingProduct} onSave={handleSave} onCancel={() => setIsFormVisible(false)} />
      ) : (
        <ProductList onEdit={handleEdit} />
      )}
    </div>
  );
}

export default App
