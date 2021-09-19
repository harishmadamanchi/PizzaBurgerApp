import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Burger from "./Components/Burger";
import Cart from "./Components/Cart";
import Pizza from "./Components/Pizza";
import { FoodData } from "./Components/Data";
import Header from "./Components/Header";
import Home from "./Components/Home";
export const FoodContext = React.createContext();

const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartvalue, setCartValue] = useState(cartItems.length);

  useEffect(() => {
    setItems(FoodData);
  }, []);
  return (
    <>
      <BrowserRouter>
        <FoodContext.Provider
          value={{ items, cartItems, setCartItems, cartvalue, setCartValue }}
        >
          <Header />
          <Switch>
            <Route path="/burger">
              <Burger />
            </Route>
            <Route path="/pizza">
              <Pizza />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </FoodContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
