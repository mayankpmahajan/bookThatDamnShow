import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../services/api';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userId = "user123"; // In a real app, this would come from authentication

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cart = await getCart(userId);
      setCartItems(cart.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await removeFromCart(userId, productId);
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.productId} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => handleRemoveFromCart(item.productId)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;