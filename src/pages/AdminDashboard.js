import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Features/productSlice";
import Loader from "../components/Loader";
import AddProductForm from "../components/AddProduct";
import EditProductDetails from "../components/EditProduct";
import DeleteProductDetails from "../components/DeleteProduct";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true); 

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const { products, selectedProduct } = useSelector((state) => state.products);

  useEffect(() => {

    setLoading(true);
    dispatch(getProduct())
      .unwrap()
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between py-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard - Product List</h2>

        {/* Open Dialog Button */}
        <button
          onClick={openDialog}
          className="rounded-md py-2 px-4 text-sm shadow-md transition-all bg-black text-white hover:bg-white hover:text-black"
        >
          Add Product
        </button>

        {/* Dialog */}
        {isDialogOpen && (
          <div
            className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg">
              <h2 id="dialog-title" className="text-xl font-medium text-slate-800 pb-4">
                It's a simple dialog.
              </h2>
              <div>
                <AddProductForm />
              </div>
              <div className="flex justify-end pt-4 space-x-2">
                <button
                  onClick={closeDialog}
                  className="rounded-md border border-transparent py-2 px-4 text-sm text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={closeDialog}
                  className="rounded-md bg-green-600 py-2 px-4 text-sm text-white shadow-md transition-all hover:bg-green-700 focus:bg-green-700 active:bg-green-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{product.title}</td>
              <td className="border border-gray-300 px-4 py-2">${product.price}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex gap-4">
                  <EditProductDetails productId={product.id} />
                  <DeleteProductDetails productId={product.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="mt-8 border-t pt-4">
          <h3 className="text-xl font-bold">Product Details</h3>
          <p><strong>Title:</strong> {selectedProduct.title}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>
          <p><strong>Category:</strong> {selectedProduct.category}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
