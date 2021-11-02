import * as React from "react";
import { useAuth } from 'domains/auth/auth.state'

const getCartItems = (token) =>
  fetch("https://ecomm-service.herokuapp.com/marketplace/cart/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const useCartItems = () => {
  const [cartItems, setCartItems] = React.useState(undefined);
  const auth = useAuth();

  const loadCartItems = () =>
    getCartItems(auth.accessToken).then((data) => setCartItems(data));
    
  React.useEffect(loadCartItems,[auth.accessToken]);

  return {
    cartItems,
    loadCartItems,
  };
};
