import api from '../backend';
import SegurancaService from '../services/SegurancaService';

const login = async (formLogin) => {
  const {data} = await api.post('/login', formLogin);

  console.log('login data', data);

  if (data.erro) {
    throw data.erro;
  } else {
    SegurancaService.setToken(data.token, data.role);
    SegurancaService.setUsuario(data.usuario);
  }
};

const logout = () => {
  SegurancaService.removerToken();
};

const registro = async (dados) => {
  await api.post('/usuarios', dados);
};

const LoginService = {
  login,
  logout,
  registro
};

export default LoginService;