import './App.css';
import {Landing} from "./landing.js";
import { EditAbout } from './aboutPage/editAbout';
import {AboutPage} from "./aboutPage/aboutPage.js"
import 'bootstrap/dist/css/bootstrap.min.css';


//each part of the page will be added as a component

/* on the off chance that any other people come after us
we gotta say we have no fucking clue what were doing lmao

we used a fair bit of react bootstrap so make sure to read on that
react router was used to sort our info
please fix the landing page
*/

function App() {
  return (
    <div className="App">
      <AboutPage />
    </div>
  );
}

export default App;
