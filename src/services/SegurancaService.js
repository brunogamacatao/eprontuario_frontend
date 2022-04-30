const TOKEN = 'token';
const ROLE = 'role';

const getToken = () => {
  return sessionStorage.getItem(TOKEN);
};

const getRole = () => {
  return sessionStorage.getItem(ROLE);
};

const setToken = (token, role) => {
  sessionStorage.setItem(TOKEN, token);
  sessionStorage.setItem(ROLE, role);
};

const removerToken = () => {
  sessionStorage.removeItem(TOKEN);
  sessionStorage.removeItem(ROLE);
};

const isAutenticado = () => {
  return getToken() ? true : false;
};

const SegurancaService = {
  getToken,
  getRole,
  setToken,
  removerToken,
  isAutenticado
};

export default SegurancaService;