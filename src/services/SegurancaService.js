const TOKEN = 'token';
const ROLE = 'role';
const USUARIO = 'usuario';

const getToken = () => {
  return sessionStorage.getItem(TOKEN);
};

const getRole = () => {
  return sessionStorage.getItem(ROLE);
};

const getUsuario = () => {
  return JSON.parse(sessionStorage.getItem(USUARIO));
};

const setToken = (token, role) => {
  sessionStorage.setItem(TOKEN, token);
  sessionStorage.setItem(ROLE, role);
};

const setUsuario = (usuario) => {
  sessionStorage.setItem(USUARIO, JSON.stringify(usuario));
};

const removerToken = () => {
  sessionStorage.removeItem(TOKEN);
  sessionStorage.removeItem(ROLE);
  sessionStorage.removeItem(USUARIO);
};

const isAutenticado = () => {
  return getToken() ? true : false;
};

const SegurancaService = {
  getToken,
  getRole,
  getUsuario,
  setToken,
  setUsuario,
  removerToken,
  isAutenticado
};

export default SegurancaService;