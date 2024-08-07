import { Route, Switch, useLocation } from "react-router-dom";
import "../css/app.css";
import "../css/footer.css";
import "../css/navbar.css";
import Footer from "./components/footer";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import HelpPage from "./screens/helpPage";
import OrdersPage from "./screens/ordersPage";
import ProductsPage from "./screens/productsPage";
import UserPage from "./screens/userPage";
import Test from "./screens/Test";
import HomePage from "./screens/homePage";
import useBasket from "./hooks/useBasket";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onRemove={onRemove}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onRemove={onRemove}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          {/* <Test/> */}
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
export default App;
