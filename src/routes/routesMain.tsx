import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/Homepage';
import { ClientRegister } from '../pages/clientRegister';

export function RoutesMain() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registerclient" element={<ClientRegister />} />
    </Routes>
  );
}
