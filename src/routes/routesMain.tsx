import {Route, Routes} from "react-router-dom";
import {HomePage} from "../pages/Homepage";
import {ClientRegister} from "../pages/clientRegister";
import {ClientProfile} from "../pages/clientProfile";
import {ProtectRoutes} from "./protectRoutes";

export function RoutesMain() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registerclient" element={<ClientRegister />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/clientProfile" element={<ClientProfile />} />
      </Route>
    </Routes>
  );
}
