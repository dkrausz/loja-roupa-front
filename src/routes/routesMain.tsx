import {Route, Routes} from "react-router-dom";
import {HomePage} from "../pages/Homepage";
import {ClientRegister} from "../pages/clientRegister";
import {ClientProfile} from "../pages/clientProfile";
import {ProtectRoutes} from "./protectRoutes";
import {ProductPage} from "../pages/productPage";

export function RoutesMain() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registerclient" element={<ClientRegister />} />
      <Route path="/products/:id" element={<ProductPage />} />

      <Route path="/clientProfile" element={<ProtectRoutes />}>
        <Route index element={<ClientProfile />} />
      </Route>
    </Routes>
  );
}
