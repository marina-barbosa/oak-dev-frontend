import { useState } from "react";
import { ProductList } from './components/productList';
import { ProductForm } from './components/productForm';
import { Header } from './components/header';
import { Footer } from './components/footer';


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
    <div className="flex flex-col min-h-screen text-gray-500 font-openSans antialiased">
      <Header />
      <main className="flex-grow">
        {isFormVisible ? (
          <ProductForm product={editingProduct} onSave={handleSave} onCancel={() => setIsFormVisible(false)} />
        ) : (
          <ProductList onEdit={handleEdit} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App
