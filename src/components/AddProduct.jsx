'use client'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../Features/adminSlice';


export default function AddProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('electronic'); 
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image for the product.');
      return;
    }

    try {
    
      const productData = {
        title: name,
        price: parseFloat(price),
        description,
        category,
        image: image, 
      };

    
      const result = await dispatch(addProduct(productData)).unwrap();

      if (result) {
       
        setName('');
        setPrice('');
        setDescription('');
        setCategory('electronic'); 
        setImage(null);
        alert('Product added successfully!');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
      <div className="mb-2">
        <label htmlFor="name" className="block">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="price" className="block">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="block">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded"
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="category" className="block">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded"
        >
          <option value="electronic">Electronic</option>
          <option value="clothing">Clothing</option>
          <option value="furniture">Furniture</option>
          <option value="jewelry">Jewelry</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="image" className="block">Image URL</label>
        <input
          type="text"
          id="image"
          value={image || ''}
          onChange={(e) => setImage(e.target.value)}
          required
          placeholder="https://example.com/image.jpg"
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
}
