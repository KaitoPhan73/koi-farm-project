import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string | undefined;
  quantity: number;
}

interface AddToCartParams {
  _id: string;
  name: string;
  price: number;
  imageUrl: string | undefined;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: AddToCartParams) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateCartItemQuantity: (id: string, quantity: number) => Promise<void>; // Add this function
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (item: AddToCartParams) => {
    try {
      const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
      let updatedCart: CartItem[];

      if (existingItem) {
        // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
        updatedCart = cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Thêm sản phẩm mới với số lượng ban đầu là 1
        updatedCart = [
          ...cartItems,
          { ...item, quantity: 1 },
        ];
      }

      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      Toast.show({
        type: 'success',
        text1: 'Added to cart successfully',
      });
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const updatedCart = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      Toast.show({
        type: 'success',
        text1: 'Removed from cart',
      });
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  const updateCartItemQuantity = async (id: string, quantity: number) => {
    try {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === id
          ? { ...cartItem, quantity }
          : cartItem
      );

      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      Toast.show({
        type: 'success',
        text1: 'Cart item updated successfully',
      });
    } catch (error) {
      console.error('Failed to update cart item quantity', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
