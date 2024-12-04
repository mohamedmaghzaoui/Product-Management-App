import { useState, useEffect } from 'react';

const CategoryForm = ({ showModal, isEditing, categoryId, setShowModal, handleAddCategory, handleEditCategory, value, setValue }) => {
  const [isError, setIsError] = useState(false);
  //state for animation
  const [isVisible, setIsVisible] = useState(false);

  // Show modal with fade-in transition
  useEffect(() => {
    if (showModal) {
      setIsVisible(true);
    } else {
      //animation timer
      const timer = setTimeout(() => setIsVisible(false), 300); // 300ms 
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className={`bg-white p-8 rounded-lg shadow-lg w-1/3 transform transition-all duration-300 ${showModal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="xl:leading-[44px] xl:text-[32px] leading-[15px] text-[22px] text-first font-extrabold text-center mb-3 text-[#0054A3]">
          {isEditing ? "Modifier la catégorie" : "Ajouter une catégorie"}
        </h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)} // change category name
          placeholder="Nom de la catégorie"
          className="w-full p-2 border rounded-md mb-4 bg-[#F2F5FB] text-[#00000]"
        />
        {isError && <p className="py-2 font-bold text-red-600 text-center">Veuillez remplir ce champ</p>}
        <div className="flex justify-between">
          <button
            onClick={() => setShowModal(false)}
            className="bg-[#FF724F] text-white text-xl font-semibold px-4 py-2 rounded-full"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              if (!value) {
                setIsError(true);
              } else {
                if (isEditing) {
                  handleEditCategory(categoryId); // edit category if the form is for editing
                } else {
                  handleAddCategory(); // add category if the form is for adding
                }
              }
            }}
            className="bg-[#219CFF] text-white text-xl font-semibold px-4 py-2 rounded-full hover:bg-blue-400"
          >
            {isEditing ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
