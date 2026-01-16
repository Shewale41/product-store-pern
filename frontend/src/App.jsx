import Navbar from "./Components/Navbar";

import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";

import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";

import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductsPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;