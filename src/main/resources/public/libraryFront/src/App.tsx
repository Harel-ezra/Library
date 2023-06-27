import "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Library from "./pages/library/Library";
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/library" element={<Library />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
