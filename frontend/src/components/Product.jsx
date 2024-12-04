import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../redux/productSlice';
import ProductForm from './ProductForm'; // Import the ProductForm component

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddProduct = () => {
    dispatch(createProduct(currentProduct));
    resetForm();
  };

  const handleEditProduct = () => {
    console.log(currentProduct)
    dispatch(updateProduct({ id: currentProduct.id, productData: currentProduct }));
    resetForm();
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const resetForm = () => {
    setCurrentProduct({
      id: '',
      name: '',
      description: '',
      price: '',
      category: '',
    });
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Produits</h1>

      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="mb-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
      >
        Ajouter un produit
      </button>

      {status === 'loading' && <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>}
      {status === 'failed' && <p>Erreur lors du chargement des produits.</p>}
      {status === 'succeeded' && (
        <table className="table-auto border-2 rounded-t-3xl shadow-md text-[#4D4D4D] w-full">
          <thead>
            <tr>
              <th className="border-b-2 border-l-2 border-r-2 py-4 px-2 bg-[#EBF7FF]">Nom</th>
              <th className="border-b-2 border-l-2 border-r-2 py-4 px-2 bg-[#EBF7FF]">Description</th>
              <th className="border-b-2 border-l-2 border-r-2 py-4 px-2 bg-[#EBF7FF]">Prix</th>
              <th className="border-b-2 border-l-2 border-r-2 py-4 px-2 bg-[#EBF7FF]">Catégorie</th>

              <th className="border-b-2 border-l-2 border-r-2 py-4 px-2 bg-[#EBF7FF]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">{product.name}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">{product.description}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">{product.price}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">{product.category.name}</td>

                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">
                  <button
                    onClick={() => {
                      setCurrentProduct(product);
                      setIsEditing(true);
                      setShowModal(true);
                    }}
                    className="p-2 bg-[#219CFF] text-white rounded-md hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 ml-2 bg-[#FF724F] text-white rounded-md hover:bg-red-600"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Product Form Modal */}
      <ProductForm
        showModal={showModal}
        setShowModal={setShowModal}
        product={currentProduct}
        setProduct={setCurrentProduct}
        handleSubmit={isEditing ? handleEditProduct : handleAddProduct}
        isEditing={isEditing}
      />
    </div>
  );
};
