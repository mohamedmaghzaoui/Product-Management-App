import React, { useState } from 'react';

const CategoryForm = ({ showModal, isEditing,categoryId, setShowModal, handleAddCategory, handleEditCategory, value, setValue }) => {
  if (!showModal) return null;
  const [isError,setIsError]=useState(false)

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{ isEditing ? "Modifier la catégorie" : "Ajouter une catégorie"}</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nom de la catégorie"
          className="w-full p-2 border rounded-md mb-4"
        />
        {isError&& <p className="py-2 font-bold text-red-600 text-center">Veuillez remplir ce champ</p>}
        <div className="flex justify-between">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              if (!value) {
                setIsError(true)
                
              }else{
                if (isEditing) {
                  handleEditCategory(categoryId); // Add category if the form is for adding
                } else {
                  handleAddCategory(); // Edit category if the form is for editing
                }

              }
              
            
              
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isEditing ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
