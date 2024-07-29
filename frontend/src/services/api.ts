import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getCart = async (userId: string) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`);
  return response.data;
};

export const addToCart = async (userId: string, product: any) => {
  const response = await axios.post(`${API_URL}/cart/${userId}/add`, product);
  return response.data;
};

export const removeFromCart = async (userId: string, productId: number) => {
  const response = await axios.delete(`${API_URL}/cart/${userId}/remove/${productId}`);
  return response.data;
};