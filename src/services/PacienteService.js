import api from '../backend';

const cadastrar = async(form) => {
  const {data} = await api.post('/pacientes', form);
  return data;
};

const editar = async(id, form) => {
  const {data} = await api.put(`/pacientes/${id}`, form);
  return data;
};

const remover = async(id) => {
  const {data} = await api.delete(`/pacientes/${id}`);
  return data;
};

const listar = async () => {
  const {data} = await api.get('/pacientes');

  if (data.erro) {
    throw data.erro;
  } else {
    return data;
  }
};

const get = async(id) => {
  const {data} = await api.get(`/pacientes/${id}`);
  return data;
};

const PacienteService = {
  cadastrar,
  editar,
  listar,
  remover,
  get
};

export default PacienteService;