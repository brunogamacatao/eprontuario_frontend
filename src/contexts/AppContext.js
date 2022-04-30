import React, {useState, useEffect} from 'react';
import LoginService from '../services/LoginService';
import SegurancaService from '../services/SegurancaService';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [logado, setLogado] = useState(false);
  const [role, setRole] = useState(false);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    setLogado(SegurancaService.isAutenticado());
    setRole(SegurancaService.getRole());
    setUsuario(SegurancaService.getUsuario() || {});
  }, []);

  const login = async (formLogin) => {
    await LoginService.login(formLogin);
    setLogado(true);
    setRole(SegurancaService.getRole());
    setUsuario(SegurancaService.getUsuario());
  };

  const logout = () => {
    LoginService.logout();
    setLogado(false);
    setRole('');
    setUsuario({});
  };

  return (
    <AppContext.Provider value={{
      sessao: {logado, role, usuario, setLogado, login, logout}, 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;