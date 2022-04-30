import React from 'react';
import { Navigate } from 'react-router-dom';

import SegurancaService from '../../services/SegurancaService';

const RotaPrivada = ({ children, role, redirectTo, ...rest }) => {
  let podeAcessar = SegurancaService.isAutenticado();

  if (podeAcessar && role) {
    podeAcessar = SegurancaService.getRole() === role;
  }

  if (podeAcessar) {
    // se estou autenticado, mostra os componentes filhos
    return children;
  } else {
    // se não está autenticado, redireciona para o login
    return <Navigate replace to={{ pathname: redirectTo, 
                    state: { from: rest.location } }} />
  }
}

export default RotaPrivada;