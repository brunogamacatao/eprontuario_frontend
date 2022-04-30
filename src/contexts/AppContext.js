import React, {useState, useEffect} from 'react';
import LoginService from '../services/LoginService';
import SegurancaService from '../services/SegurancaService';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [logado, setLogado] = useState(false);
  const [role, setRole] = useState(false);

  useEffect(() => {
    setLogado(SegurancaService.isAutenticado());
    setRole(SegurancaService.getRole());
  }, []);

  const login = async (formLogin) => {
    await LoginService.login(formLogin);
    setLogado(true);
    setRole(SegurancaService.getRole());
  };

  const logout = () => {
    LoginService.logout();
    setLogado(false);
    setRole('');
  };

  return (
    <AppContext.Provider value={{
      sessao: {logado, role, setLogado, login, logout}, 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;