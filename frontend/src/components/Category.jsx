import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../redux/categorySlice';
import CategoryForm from './CategoryForm'; // Import the CategoryForm component

export const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryId,setCategoryId]=useState('')

  const [showModal, setShowModal] = useState(false);
  const [isEditing,setIsEdeting]=useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Function to handle adding a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      dispatch(createCategory({ name: newCategoryName }));
      setNewCategoryName('');
      setShowModal(false); // Close modal after adding
    }
  };

  const handleEditCategory = (id) => {
    if (newCategoryName.trim() !== '') {
      // Dispatch the correct category data with the category id
      
      dispatch(updateCategory({ id, categoryData: { name: newCategoryName } }));
      
      setNewCategoryName('');
      setShowModal(false); // Close modal after editing
    }
  };
  

  // Handle the delete action
  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Catégories</h1>

      <button
        onClick={() => {
          setIsEdeting(false)
        
          setShowModal(true);
        }}
        className="mb-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
      >
        Ajouter une catégorie
      </button>

      {status === 'loading' && <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>}
      {status === 'failed' && <p>Erreur lors du chargement des catégories.</p>}
      {status === 'succeeded' && (
        <table className="table-auto border-2 rounded-t-3xl shadow-md text-[#4D4D4D] w-full">
          <thead>
            <tr>
              <th className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 bg-[#EBF7FF]">Nom</th>
              <th className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 bg-[#EBF7FF]">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 text-center">{category.name}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 text-center">
                  <button
                    onClick={() => {
                      setCategoryId(category.id)
                      setIsEdeting(true)
                      setNewCategoryName(category.name)
                     
                     
                      setShowModal(true);
                    }}
                    className="p-2 bg-[#219CFF] text-white rounded-md hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
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

      {/* Category Form Modal for adding or editing category */}
      <CategoryForm
        showModal={showModal}
        setShowModal={setShowModal}
        handleAddCategory={handleAddCategory}
        handleEditCategory={handleEditCategory}
        value={newCategoryName}
        setValue={setNewCategoryName}
        isEditing={isEditing}
        categoryId={categoryId}
      />
    </div>
  );
};
