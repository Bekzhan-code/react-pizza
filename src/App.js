import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="bg-customYellow py-11">
      <div className="bg-white w-11/12 mx-auto rounded-xl px-16">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
