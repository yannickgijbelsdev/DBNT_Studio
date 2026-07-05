import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkPage from "./components/WorkPage";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WorkPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/artikel/:id" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
