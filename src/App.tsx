
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Input from "./pages/Input";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/input" element={<Input />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
