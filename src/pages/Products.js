"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Features/productSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader"; 

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    setLoading(true);

    
    dispatch(getProduct()).then(() => {

      setLoading(false);
    });
  }, [dispatch]);

  return (
    <div>
   
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">All Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`} 
                className="border p-4 rounded hover:shadow-md flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-4"
                />
                <h2 className="text-xl font-semibold text-center">{product.title}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
