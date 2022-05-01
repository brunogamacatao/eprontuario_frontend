import api from '../backend';

/**
 * Rotas do local-controller:
 * + ATENDIMENTOS +
 * GET    /:id_local/pacientes/:id_paciente/atendimentos => retorna todos os atendimentos de um local
 * GET    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento => retorna um atendimento de um local
 * POST   /:id_local/pacientes/:id_paciente/atendimentos => cadastra um atendimento em um local
 * + PRESCRIÇÕES +
 * GET    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/prescricoes => retorna as prescrições de um atendimento
 * POST   /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/prescricoes => adiciona uma prescrição a um atendimento
 * GET    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/prescricoes/:id_prescricao
 * PUT    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/prescricoes/:id_prescricao
 * DELETE /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/prescricoes/:id_prescricao
 * + ATESTADOS +
 * GET    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/atestados => retorna todos os atestados de um atendimento
 * POST   /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/atestados => cadastra um atestado em um atendimento
 * GET    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/atestados/:id_atestado
 * PUT    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/atestados/:id_atestado
 * DELETE /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/atestados/:id_atestado
 * + REQUISIÇÕES +
 * GET    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/requisicoes => retorna todas as requisições de um atendimento
 * POST   /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/requisicoes => cadastra uma requisição em um atendimento
 * GET    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/requisicoes/:id_requisicao
 * PUT    /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/requisicoes/:id_requisicao
 * DELETE /:id_local/pacientes/:id_paciente/atendimentos/:id_atendimento/requisicoes/:id_requisicao
 */

const cadastrar = async(local, paciente, form) => {
  // /:id_local/pacientes/:id_paciente/atendimentos
  const {data} = await api.post(`/locais/${local}/pacientes/${paciente}/atendimentos`, form);
  return data;
};

const editar = async(id, form) => {
  const {data} = await api.put(`/atendimentos/${id}`, form);
  return data;
};

const remover = async(id) => {
  const {data} = await api.delete(`/atendimentos/${id}`);
  return data;
};

const listar = async () => {
  const {data} = await api.get('/atendimentos');

  if (data.erro) {
    throw data.erro;
  } else {
    return data;
  }
};

const get = async(id) => {
  const {data} = await api.get(`/atendimentos/${id}`);
  return data;
};

const AtendimentoService = {
  cadastrar,
  editar,
  listar,
  remover,
  get
};

export default AtendimentoService;