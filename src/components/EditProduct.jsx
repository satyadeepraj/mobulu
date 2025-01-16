// EditProductDetails.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../Features/productSlice";
import { updateProductDetail } from "../Features/adminSlice";
import { toastService } from "../toastify";

const EditProductDetails = ({ productId }) => {
  const dispatch = useDispatch();

  
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === productId)
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(productId)); 
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setProductDetails({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const updatedDetails = { ...productDetails, price: Number(productDetails.price) };
    console.log(updatedDetails,'......55......')
    dispatch(updateProductDetail({ productId, productDetails: updatedDetails })); 
    toastService.success("Product details updated successfully!");
    closeDialog();
  };

  return (
    <>
      {/* Open Dialog Button */}
      <button
        onClick={openDialog}
        className="rounded-md py-2 px-4 text-sm shadow-md transition-all bg-green-700 text-white hover:bg-white hover:text-black"
      >
        Edit Details
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
              Product Id : {productId}
            </h2>
            <div className="p-4">
              <h3 className="text-xl font-medium">Edit Product</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  value={productDetails.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="border p-2 mb-2 w-full"
                />
                <textarea
                  name="description"
                  value={productDetails.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="number"
                  name="price"
                  value={productDetails.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  name="category"
                  value={productDetails.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  name="image"
                  value={productDetails.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="border p-2 mb-2 w-full"
                />
                <div className="flex justify-end space-x-2">
                  <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
                    Save Changes
                  </button>
                </div>
              </form>
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

export default EditProductDetails;
