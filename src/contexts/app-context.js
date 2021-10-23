import { createContext } from 'react';

const AppContext = createContext({
  cartItems: [],
  setCartItems: () => {}
});

export default AppContext;
