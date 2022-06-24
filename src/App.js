import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import { RegisterLog } from "./RegisterAndLog";
import { ProfilePage } from "./profile/ProfilePage.js";

/*
 * The front end of the Applicant Tracking System for Delta Controls
 * Made with react and using many bootstrap components for styling
 */
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/submission/*" element={<RegisterLog />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
