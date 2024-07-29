import React from 'react';
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const generateRandomProducts = (count: number): Product[] => {
  const productNames = ["Shoes", "Hat", "T-Shirt", "Jeans", "Jacket", "Sunglasses", "Watch", "Backpack"];
  const descriptions = [
    "Perfect for any occasion",
    "Stylish and comfortable",
    "A must-have for your wardrobe",
    "Durable and fashionable",
    "Great for everyday use",
    "Elevate your style with this piece",
    "Practical and trendy",
    "You'll love how this feels"
  ];
  const imageUrls = [
    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
    "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
    "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: productNames[Math.floor(Math.random() * productNames.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
    price: Number((Math.random() * 100 + 10).toFixed(2))
  }));
};

const Cards: React.FC = () => {
    const navigate = useNavigate();

    const products: Product[] = generateRandomProducts(10); // Generate 10 random products

    const buy = (productId: number) => {
        navigate(`/products/${productId}`);
    }

    return (
        <div className="carousel carousel-center bg-neutral rounded-box w-screen space-x-4 p-4 overflow-hidden">
            {products.map((product) => (
                <div key={product.id} className="card card-compact bg-base-100 w-96 shadow-xl carousel-item">
                    <figure>
                        <img src={product.imageUrl} alt={product.name} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={() => buy(product.id)}>Buy Now</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards;