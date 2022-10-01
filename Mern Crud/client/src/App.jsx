
import './App.css';
import Home from './component/page/Home';
import Tabel from './component/tabel/Tabel';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Ragister from './component/ragister/Ragister';
import Edit from './component/edit/Edit';
import Details from './component/details/Details';
import Service from './component/tabel/Service';
import Demo from './component/tabel/Demo';
function App() {
  return (
    <div className="App">

      <Home/>
    <Routes>
   
      {/* <Route path="/"  element={<Demo />} /> */}
      {/* <Route path="/"  element={<Service />} /> */}
      <Route path="/"  element={<Tabel />} />
      <Route path="/ragister"  element={<Ragister/>} />
      <Route path="/edit/:id"  element={<Edit/>} />
      <Route path="/view/:id"  element={<Details/>} />

    </Routes>
 
    </div>
  );
}

export default App;
