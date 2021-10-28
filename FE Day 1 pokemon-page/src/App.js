import logo from './logo.svg';
import './App.css';
import { data } from "./page/data"
import { PokemonCard } from "./components/pokemon-card"
import { PokemonPage } from "./page/pokemon"

function App() {
  return (
    <div>
      <h1 className="text-4xl	text-center m-12">Pokemon Page</h1>
      <div className="grid grid-cols-4">
        <div></div>
        <div className="col-span-2"><PokemonPage /></div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
