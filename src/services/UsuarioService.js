import api from '../backend';

const getUsuarios = async () => {
  const {data} = await api.get('/usuarios');

  if (data.erro) {
    throw data.erro;
  } else {
    return data;
  }
};

const bloqueia = async (id) => {
  await api.get(`/usuarios/bloqueia/${id}`);
};

const desbloqueia = async (id) => {
  await api.get(`/usuarios/desbloqueia/${id}`);
};

const UsuariosService = {
  getUsuarios,
  bloqueia,
  desbloqueia
};

export default UsuariosService;