import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { AppProvider } from "./contexts/AppContext";

import Principal from "./components/Principal";
import PaginaNaoEncontrada from './components/PaginaNaoEncontrada';
import Login from './components/Login';
import Cabecalho from "./components/Cabecalho";
import Registro from './components/Registro';
import RotaPrivada from "./components/seguranca/RotaPrivada";
import ListarUsuarios from './components/ListarUsuarios';

function App() {
  return (
    <AppProvider>
      <Router>
        <Cabecalho/>
        <main className="container flex">
          <Routes>
            <Route path="/" exact={true} element={
              <RotaPrivada redirectTo="/login">
                <Principal/>
              </RotaPrivada>
            }/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={
              <RotaPrivada redirectTo="/login">
                <Registro/>
              </RotaPrivada>
            }/>
            <Route path="/usuarios" element={
              <RotaPrivada role="administrador" redirectTo="/login">
                <ListarUsuarios/>
              </RotaPrivada>
            }/>
            <Route path="*" element={<PaginaNaoEncontrada/>}/>
          </Routes>
        </main>
      </Router>
    </AppProvider>
  );
}

export default App;