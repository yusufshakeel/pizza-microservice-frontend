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

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <AppContext.Provider value={{ cartItems, setCartItems }}>
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
