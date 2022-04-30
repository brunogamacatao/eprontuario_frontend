import {useContext} from 'react'
import AppContext from '../../contexts/AppContext';

export default function SeAutenticado({ children }) {
  const {sessao} = useContext(AppContext);

  if (sessao.logado) {
    return children;
  } else {
    return '';
  }
}