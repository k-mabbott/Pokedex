import './App.css';
import {Routes , Route} from "react-router-dom";
import Main from './views/Main';
import OnePoke from './views/OnePoke';
import OneAbility from './views/OneAbility';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/poke/:id' element={<OnePoke />} />
        <Route path='/ability/:id' element={<OneAbility />} />
      </Routes>
    </div>
  );
}

export default App;
