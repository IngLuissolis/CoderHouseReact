import './App.css';
import NavBar from './Components/NavBar/NavBar';
import ItemListContainer from './Containers/ItemListContainer/ItemListContainer';

function App() {
  return (
    <div className="App">
      <h1>Tienda Indumentaria Mundial Qatar 2022</h1>
      <NavBar/>
      <ItemListContainer greeting={"Bienvenido Simpatizante Mundialista"}/>
    </div>
  );
}

export default App;
