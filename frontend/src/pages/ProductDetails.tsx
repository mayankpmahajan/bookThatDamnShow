import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from '../services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const userId = "user123"; // In a real app, this would come from authentication

  useEffect(() => {
    // Fetch product details (replace with actual API call)
    const mockProduct: Product = {
      id: Number(id),
      name: "Shoes",
      description: "If a dog chews shoes whose shoes does he choose?",
      imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      price: 99.99,
    };
    setProduct(mockProduct);
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      try {
        await addToCart(userId, { ...product, quantity: 1 });
        alert('Product added to cart!');
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart.');
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={product.imageUrl} alt={product.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.name}</div>
            <p className="mt-2 text-gray-500">{product.description}</p>
            <p className="mt-2 text-gray-900">Price: ${product.price.toFixed(2)}</p>
            <button 
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;