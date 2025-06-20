import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddItem from "./components/AddItem";
import ViewItems from "./components/ViewItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/add-item" />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/view-items" element={<ViewItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
