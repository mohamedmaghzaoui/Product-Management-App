import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { fetchCategories } from '../redux/categorySlice';

export const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Catégories</h1>

      {status === 'loading' && <div className="flex  ">
  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
</div>
}
      {status === 'failed' && <p>Erreur lors du chargement des catégories.</p>}
      {status === 'succeeded' && (
        <table className="table-auto  border-2 rounded-t-3xl shadow-md text-[#4D4D4D]">
          <thead>
            <tr>
              <th className="border-b-2 py-4 md:px-4 px-1 text-left w-1/2 bg-[#EBF7FF] rounded-tr-3xl">Nom</th>
              <th className="border-b-2 py-4 md:px-4 px-1 text-left w-1/2 bg-[#EBF7FF] rounded-tr-3xl">Action</th>

            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 text-[#4d4d4d] text-center">{category.name}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 text-[#4d4d4d] text-center">

                <button className="p-2 me-4 bg-[#219CFF]   text-white  rounded-md hover:bg-blue-600">
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-[#FF724F] text-white rounded-md hover:bg-red-600">
                    <MdDelete />
                  </button>
                </td>
           
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
