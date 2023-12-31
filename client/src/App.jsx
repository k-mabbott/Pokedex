import './App.css';
import {Routes , Route} from "react-router-dom";
import Main from './views/Main';
import OnePoke from './views/OnePoke';
import OneAbility from './views/OneAbility';
import OneMove from './views/OneMove';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route exact path='/poke/:id' element={<OnePoke />} />
        <Route path='/ability/:id' element={<OneAbility />} />
        <Route path='/move/:id' element={<OneMove />} />
      </Routes>
    </div>
  );
}

export default App;
