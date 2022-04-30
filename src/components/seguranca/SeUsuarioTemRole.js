import {useContext} from 'react'
import AppContext from '../../contexts/AppContext';

export default function SeUsuarioTemRole({ role, children }) {
  const {sessao} = useContext(AppContext);

  if (sessao.logado && sessao.role === role) {
    return children;
  } else {
    return '';
  }
}