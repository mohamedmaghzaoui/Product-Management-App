import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchProducts } from '../redux/productSlice';

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="container me-9 ms-5 p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Produits</h1>

      {status === 'loading' && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {status === 'failed' && <p className="text-red-600">Erreur lors du chargement des produits.</p>}

      {status === 'succeeded' && (
        <table className="table-auto w-full border-2 rounded-t-3xl shadow-md text-[#4D4D4D]">
          <thead>
            <tr>
              <th className="border-b-2 py-4 md:px-4 px-1 text-left w-1/7 bg-[#EBF7FF] rounded-tr-3xl">Nom</th>
              <th className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 w-1/3 bg-[#EBF7FF] rounded-tr-3xl">Description</th>
              <th className="border-b-2 py-4 md:px-4 px-1 w-1/7 bg-[#EBF7FF] rounded-tr-3xl">Prix</th>
              <th className="border border-gray-300 px-4 py-2 bg-[#EBF7FF] rounded-tr-3xl">Catégorie</th>
              <th className="border border-gray-300 px-4 py-2 bg-[#EBF7FF] rounded-tr-3xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 text-[#4d4d4d] text-center">{product.name}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 text-[#4d4d4d] text-center">{product.description}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 text-[#4d4d4d] text-center">{product.price}</td>
                <td className="border-b-2 border-l-2 border-r-2 py-4 md:px-4 px-1 text-[#0074E4] text-center">{product.category.name}</td>
                <td className="border-b-2 border-l-2 border-r-2  py-4 md:px-4 px-1 text-center ">
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
