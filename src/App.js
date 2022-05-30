import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import { RegisterLog } from "./RegisterAndLog";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/submission/*" element={<RegisterLog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
