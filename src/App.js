import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import { RegisterLog } from "./RegisterAndLog.js";

/* on the off chance that any other people come after us
we gotta say we have no fucking clue what were doing lmao

we used a fair bit of react bootstrap so make sure to read on that
react router was used to sort our info
please fix the landing page
*/

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
