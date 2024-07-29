import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [CartItemSchema],
});

export default mongoose.model<ICart>('Cart', CartSchema);