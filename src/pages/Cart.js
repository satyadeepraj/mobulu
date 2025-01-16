import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const productDetails = useSelector((state) => state.products.products);
  console.log(productDetails, "....13....");

  return (
    <div>
      <h2 className="text-xl text-black font-bold mb-4">Your Cart</h2>
      <div className="space-y-6">
        {cartItems?.map((cartItem, cartIndex) => (
          <div key={cartIndex}>
            <h3 className="font-bold text-lg">Cart ID: {cartItem.id}</h3>
            <div className="space-y-4">
              {cartItem.products?.map((item, index) => {
                
                const relatedProduct = Array.isArray(productDetails)
                  ? productDetails.find(
                      (product) => product.id === item?.productId
                    )
                  : null;

                console.log(relatedProduct, "....54...");

                return (
                  <div key={index} className="border text-black rounded-lg p-4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-lg">Product ID: {item?.productId}</span>
                      <span className="text-gray-600">Quantity: {item?.quantity}</span>
                    </div>
                    {relatedProduct && (
                      <div className="space-y-2">
                        <div className="text-xl  font-semibold">{relatedProduct.title}</div>
                        <div className="text-gray-700">Price: ${relatedProduct.price}</div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
