import  { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice'; // Adjust the path as needed

const ProductForm = ({ showModal, setShowModal, product, setProduct, handleSubmit, isEditing }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);
  const [error, setError] = useState('');
 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (!showModal) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    // Check if any field is empty
    if (!product.name || !product.price || !product.category) {
      setError('Veuillez remplir tous les champs du formulaire.');
      return false;
    }
    if(product.price<=0){
        setError('le prix doit être supérieur à 0.');
        return false;
    }
    return true;
  };
  const onSubmit = () => {
    if (validateForm()) {
      handleSubmit();
      setError("")
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="xl:leading-[44px] xl:text-[32px] leading-[15px] text-[22px] text-first font-extrabold text-center mb-3 text-[#0054A3]">{isEditing ? "Modifier le produit" : "Ajouter un produit"}</h2>
        {error && <p className="text-red-600 text-sm font-bold mb-4">{error}</p>}
        <input
          required
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nom du produit"
          className="w-full p-2 border rounded-md mb-4 bg-[#F2F5FB] text-[#00000]"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded-md mb-4 bg-[#F2F5FB] text-[#00000]"
        />
        <input
          
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Prix"
          className="w-full p-2 border rounded-md mb-4 bg-[#F2F5FB] text-[#00000]"
          required
        />
        
        <select
            
            name="category"
            value={product.category.id}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4 bg-[#F2F5FB] text-[#00000]"
            >
            <option className='bg-[#F2F5FB] text-[#00000]' value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
                <option className="bg-[#F2F5FB] text-[#00000]" key={category.id} value={category.id}>
                {category.name}
                </option>
            ))}
        </select>


        <div className="flex justify-between">
          <button
            onClick={() => 
                {setError("")
                 setShowModal(false)}}
            className="bg-[#FF724F]  text-white text-xl font-semibold px-4 py-2 rounded-full "
          >
            Annuler
          </button>
          <button
           onClick={onSubmit}
            className="bg-[#219CFF] text-white text-xl font-semibold px-4 py-2 rounded-full hover:bg-blue-400"
          >
            {isEditing ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
