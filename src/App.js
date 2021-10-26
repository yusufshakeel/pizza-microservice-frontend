import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

import UserPage from './pages/UserPage';
import AppContext from './contexts/app-context';
import { ToastContainer } from 'react-toastify';
import JsonParser from './functionals/json-parser';
import AppConstants from './constants/app-constants';

function App() {
  const itemsInCartCache = JsonParser(localStorage.getItem(AppConstants.APP_USER_CART)) || {
    updatedAt: new Date().getTime(),
    items: []
  };
  const [cart, setCart] = useState(itemsInCartCache);

  return (
    <AppContext.Provider value={{ cart, setCart }}>
      <ToastContainer />
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
