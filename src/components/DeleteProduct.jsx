import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductDetail } from "../Features/adminSlice";
import { toastService } from "../toastify";

const DeleteProductDetails = ({ productId }) => {
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === productId)
  );
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  
  const handleDelete = () => {

    console.log("Deleted Product Data:", product);
    
    dispatch(deleteProductDetail(productId)); 
    toastService.success("Product deleted successfully!");
    closeDialog();
  };

  return (
    <>
      {/* Open Dialog Button */}
      <button
        onClick={openDialog}
        className="bg-red-600 text-white py-2 px-4 rounded"
      >
        Delete
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
            <h2
              id="dialog-title"
              className="text-xl font-medium text-slate-800 pb-4"
            >
              Product Id : {productId}
            </h2>
            <div className="p-4">
              <h3 className="text-xl font-medium">Delete Product</h3>
              <p>Are you sure you want to delete this product?</p>
              <div className="">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
              <button
                onClick={closeDialog}
                className="rounded-md border border-transparent py-2 px-4 text-sm text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProductDetails;
