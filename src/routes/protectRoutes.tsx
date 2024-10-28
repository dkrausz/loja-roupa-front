import {useContext} from "react";
import {Outlet, Navigate} from "react-router-dom";
import {ClientContext} from "../providers/clientContext";

export const ProtectRoutes = () => {
  const {activeClient} = useContext(ClientContext);

  return activeClient ? <Outlet /> : <Navigate to="/" />;
};
