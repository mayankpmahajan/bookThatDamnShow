import express from 'express';
import Cart, { ICartItem } from '../models/cart';

const router = express.Router();

// Get cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Add item to cart
router.post('/:userId/add', async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (cart) {
      const existingItem = cart.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, quantity } as ICartItem);
      }
      await cart.save();
    } else {
      await Cart.create({
        userId: req.params.userId,
        items: [{ productId, name, price, quantity }],
      });
    }

    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

// Remove item from cart
router.delete('/:userId/remove/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId !== parseInt(req.params.productId));
      await cart.save();
    }
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

export default router;