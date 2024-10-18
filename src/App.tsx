import {ToastContainer} from "react-toastify";
import {RoutesMain} from "./routes/routesMain";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <RoutesMain />
      <ToastContainer />
    </>
  );
}

export default App;
