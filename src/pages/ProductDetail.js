import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import { getProductDetail } from "../Features/productSlice";
import { getcart, updateCart } from "../Features/cartSlice";


const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const productDetails = useSelector((state) => state.products.productDetail);
  const cart = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getProductDetail(id)); 
    dispatch(getcart(2)); 
  }, [dispatch, id]);

  const handleAddToCart = () => {
    const updatedProducts = cart?.products
      ? [...cart.products, { productId: productDetails.id, quantity: 1 }]
      : [{ productId: productDetails.id, quantity: 1 }];
  
    const updatedCart = {
      userId: cart?.userId || 2, 
      date: new Date().toISOString().split("T")[0],
      products: updatedProducts,
    }; 
    console.log(updatedCart,"....29.....")
  
    dispatch(updateCart({ cartId: cart?.id || 0, updatedCart }))
      .unwrap()
      .then(() => {
       
        dispatch(getcart(2)); 
        alert("Product added to cart!");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert(`Error adding to cart: ${error}`);
      });
  };
  

  return (
    <div>
      {productDetails ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{productDetails.title}</h1>
          <img
            src={productDetails.image}
            alt={productDetails.title}
            className="w-full h-80 object-contain mb-4"
          />
          <p className="text-gray-600 mb-4">${productDetails.price?.toFixed(2)}</p>
          <p className="mb-4">{productDetails.description}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        
      </div>
    </div>
  );
};

export default ProductDetail;
