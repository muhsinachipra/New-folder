import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}>
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
