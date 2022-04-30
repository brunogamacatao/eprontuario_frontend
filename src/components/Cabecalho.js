import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../contexts/AppContext';

import SeAutenticado from './seguranca/SeAutenticado';
import SeNaoAutenticado from './seguranca/SeNaoAutenticado';
import SeUsuarioTemRole from './seguranca/SeUsuarioTemRole';

export default function Cabecalho() {
  const {sessao} = useContext(AppContext);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">eProntuário</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <SeAutenticado>
                <li className="nav-item">
                  <Link className="nav-link active" to="/interna">Interna</Link>
                </li>
              </SeAutenticado>
              <SeNaoAutenticado>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>
              </SeNaoAutenticado>
              <SeUsuarioTemRole role="administrador">
                <li className="nav-item">
                  <Link className="nav-link active" to="/usuarios">Usuários</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/registro">Novo Usuário</Link>
                </li>
              </SeUsuarioTemRole>
              <SeAutenticado>
                <li className="nav-item">
                  <Link className="nav-link active" to="/" onClick={() => sessao.logout()}>Sair</Link>
                </li>
              </SeAutenticado>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}