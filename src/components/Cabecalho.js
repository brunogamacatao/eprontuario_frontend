import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

import SeAutenticado from './seguranca/SeAutenticado';
import SeNaoAutenticado from './seguranca/SeNaoAutenticado';
import SeUsuarioTemRole from './seguranca/SeUsuarioTemRole';

import icon from '../imagens/user-icon.png';

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
              <SeNaoAutenticado>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>
              </SeNaoAutenticado>
            </ul>

            <ul>
              <SeAutenticado>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={icon} className="avatar" alt="Avatar"/> 
                    {sessao.usuario.nome} <b className="caret"></b>
                  </Link>
                  
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <SeUsuarioTemRole role="administrador">
                      <li>
                        <Link className="nav-link active" to="/usuarios">Usuários</Link>
                      </li>
                      <li>
                        <Link className="nav-link active" to="/registro">Novo Usuário</Link>
                      </li>
                      <li><hr className="dropdown-divider"/></li>
                    </SeUsuarioTemRole>
                    <li>
                      <Link className="dropdown-item" to="/login" onClick={() => sessao.logout()}>Sair</Link>
                    </li>
                  </ul>
                </li>
              </SeAutenticado>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}