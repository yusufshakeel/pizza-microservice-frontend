import { createContext } from 'react';

const AppContext = createContext({
  cart: {
    updatedAt: new Date().getTime(),
    items: []
  },
  setCart: () => {}
});

export default AppContext;
