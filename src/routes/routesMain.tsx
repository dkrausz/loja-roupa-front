import {Route, Routes} from "react-router-dom";
import {HomePage} from "../pages/Homepage";
import {ClientRegister} from "../pages/clientRegister";
import {ClientProfile} from "../pages/clientProfile";
import {ProtectRoutes} from "./protectRoutes";
import {ProductPage} from "../pages/productPage";
import {ProductsPage} from "../pages/productsPage";
import {CartPage} from "../pages/cartPage";

export function RoutesMain() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registerclient" element={<ClientRegister />} />
      <Route path="/products" element={<ProductsPage pageTitle="Shop" />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/offers" element={<ProductsPage pageTitle="Ofertas" />} />
      <Route path="/news" element={<ProductsPage pageTitle="Novidades" />} />
      <Route path="/brands" element={<ProductsPage pageTitle="Marcas" />} />
      <Route path="/cartPage" element={<CartPage />} />

      <Route path="/clientProfile" element={<ProtectRoutes />}>
        <Route index element={<ClientProfile />} />
      </Route>
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
