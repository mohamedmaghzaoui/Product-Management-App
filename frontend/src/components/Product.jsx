import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../redux/productSlice';
import ProductForm from './ProductForm'; // Import the ProductForm component

export const Products = () => {
  // Redux configuration
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  // States for managing product editing/adding
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // States for search and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Handle adding a product
  const handleAddProduct = () => {
    dispatch(createProduct(currentProduct));
    resetForm();
  };

  // Handle editing a product
  const handleEditProduct = () => {
    const categoryId = currentProduct.category && typeof currentProduct.category === 'object'
      ? currentProduct.category.id
      : currentProduct.category;

    dispatch(updateProduct({
      id: currentProduct.id,
      productData: {
        ...currentProduct,
        category: categoryId,
      }
    }));
    resetForm();
  };

  // Handle deleting a product
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  // Reset product state and hide modal
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

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'priceAsc') return a.price - b.price;
      if (sortOption === 'priceDesc') return b.price - a.price;
      if (sortOption === 'category') return a.category.name.localeCompare(b.category.name);
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Produits</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input is-primary mb-4"
      />

      {/* Sorting options */}
      <div className="mb-4 flex items-center space-x-4">
  <label className="text-gray-700 font-medium">Trier par :</label>
  <div className="flex-grow select is-primary">
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="select is-primary w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Aucun</option>
      <option value="priceAsc">Prix : Croissant</option>
      <option value="priceDesc">Prix : Décroissant</option>
      <option value="category">Catégorie</option>
    </select>
  </div>
</div>


      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="mb-4 button is-primary"
      >
        Ajouter un produit
      </button>

      {/* Loading and error states */}
      {status === 'loading' && <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>}
      {status === 'failed' && <p>Erreur lors du chargement des produits.</p>}

      {/* Render products in a table */}
      {status === 'succeeded' && (
        <table className="table-auto border-2 text-center rounded-t-3xl shadow-md text-[#4D4D4D] w-full">
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
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">{product.name}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">{product.description}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">{product.price}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center">{product.category.name}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 px-2 text-center align-middle">
  <div className="flex flex-row justify-center items-center space-x-2">
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
      className="p-2 bg-[#FF724F] text-white rounded-md hover:bg-red-600"
    >
      <MdDelete />
    </button>
  </div>
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
