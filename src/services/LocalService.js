import api from '../backend';

const cadastrar = async(formLocal) => {
  const {data} = await api.post('/locais', formLocal);
  return data;
};

const editar = async(id, formLocal) => {
  const {data} = await api.put(`/locais/${id}`, formLocal);
  return data;
};

const remover = async(id) => {
  const {data} = await api.delete(`/locais/${id}`);
  return data;
};

const listar = async () => {
  const {data} = await api.get('/locais');

  if (data.erro) {
    throw data.erro;
  } else {
    return data;
  }
};

const get = async(id) => {
  const {data} = await api.get(`/locais/${id}`);
  return data;
};

const LocalService = {
  cadastrar,
  editar,
  listar,
  remover,
  get
};

export default LocalService;