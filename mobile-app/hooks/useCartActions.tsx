import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TProductResponse } from "@/schema/product.schema";
import Toast from "react-native-toast-message";

// Định nghĩa interface CartItem
interface CartItem {
  _id: string; // Sử dụng _id thay vì id
  name: string;
  price: number;
  imageUrl: string | undefined; // Thay đổi kiểu thành string | undefined
  quantity: number; // Thêm trường quantity
}

// Định nghĩa AddToCartParams
export interface AddToCartParams {
  _id: string; // ID của sản phẩm
  name: string; // Tên sản phẩm
  price: number; // Giá sản phẩm
  imageUrl: string | undefined; // Đường dẫn đến hình ảnh sản phẩm
  quantity: number; // Số lượng sản phẩm
}


// Định nghĩa CartContextType
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: AddToCartParams) => Promise<void>; // Sử dụng AddToCartParams
  removeFromCart: (_id: string) => Promise<void>; // Sử dụng _id
  clearCart: () => Promise<void>;
  calculateTotalPrice: () => number;
  isItemInCart: (_id: string) => boolean; // Sử dụng _id
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hàm để hiển thị toast thông báo khi xóa giỏ hàng
const showToastClearCart = () => {
  Toast.show({
    type: "info",
    text1: "Cleared all items from cart",
  });
};

// CartProvider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Sử dụng CartItem[]

  // Tải giỏ hàng từ AsyncStorage khi khởi tạo
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart items", error);
    }
  };

  const addToCart = async (item: AddToCartParams) => { // Sử dụng AddToCartParams
    try {
      const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
      let updatedCart: CartItem[];

      if (existingItem) {
        updatedCart = cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedCart = [
          ...cartItems,
          { _id: item._id, name: item.name, price: item.price, imageUrl: item.imageUrl, quantity: item.quantity },
        ];
      }

      setCartItems(updatedCart);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      Toast.show({
        type: "success",
        text1: "Item added to cart successfully",
      });
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const removeFromCart = async (_id: string) => {
    try {
      const updatedCart = cartItems.filter((item) => item._id !== _id);
      setCartItems(updatedCart);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      Toast.show({
        type: "success",
        text1: "Item removed from cart successfully",
      });
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      await AsyncStorage.removeItem("cart");
      showToastClearCart();
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const isItemInCart = (_id: string) => cartItems.some((item) => item._id === _id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        calculateTotalPrice,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
