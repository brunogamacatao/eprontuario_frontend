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
import FormLocal from "./components/locais/FormLocal";
import ListarLocais from "./components/locais/ListarLocais";
import FormPaciente from "./components/pacientes/FormPaciente";
import ListarPacientes from "./components/pacientes/ListarPacientes";
import FormAtendimento from "./components/atendimentos/FormAtendimento";
import ListarAtendimentos from "./components/atendimentos/ListarAtendimentos";
import BoasVindas from "./components/BoasVindas";
import FormPrescricao from "./components/prescricoes/FormPrescricao";

function App() {
  return (
    <AppProvider>
      <Router>
        <Cabecalho/>
        <main className="container flex mw-100">
          <Routes>
            <Route path="/" exact={true} element={
              <RotaPrivada redirectTo="/login">
                <Principal/>
              </RotaPrivada>
            }>
              <Route path="/" element={<BoasVindas/>}/>
              <Route path="local/novo" element={<FormLocal/>}/>
              <Route path="local/listar" element={<ListarLocais/>}/>
              <Route path="local/editar/:localId" element={<FormLocal/>}/>
              <Route path="paciente/novo" element={<FormPaciente/>}/>
              <Route path="paciente/listar" element={<ListarPacientes/>}/>
              <Route path="paciente/editar/:pacienteId" element={<FormPaciente/>}/>
              <Route path="atendimento/novo" element={<FormAtendimento/>}/>
              <Route path="atendimento/listar" element={<ListarAtendimentos/>}/>
              <Route path="prescricoes/nova" element={<FormPrescricao/>}/>
            </Route>
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