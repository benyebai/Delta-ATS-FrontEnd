import './App.css';
import {Landing} from "./landing.js";
import { EditAbout } from './aboutPage/editAbout';
import {AboutPage} from "./aboutPage/aboutPage.js"
import 'bootstrap/dist/css/bootstrap.min.css';


//each part of the page will be added as a component

function App() {
  return (
    <div className="App">
      <EditAbout />
    </div>
  );
}

export default App;
