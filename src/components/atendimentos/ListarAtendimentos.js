import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import AtendimentoService from '../../services/AtendimentoService';

import '../../styles/table_usuarios.scss';
import ConfirmModal from '../util/ConfirmModal';

export default function ListarAtendimentos() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);

  const carregarDados = async () => setDados(await AtendimentoService.listar());

  useEffect(() => {
    carregarDados();
  }, []);

  const remove = async (exibirConfirmModal, id) => {
    exibirConfirmModal('Tem certeza que quer remover esse registro?', async (opcao) => {
      if (opcao === 's') {
        await AtendimentoService.remover(id);
        carregarDados();
      }
    });
  };

  const editar = (id) => {
    navigate(`/atendimento/editar/${id}`, { replace: true });
  };

  const renderRegistro = (exibirConfirmModal) => {
    return (registro) => {
      return (
        <tr key={registro._id} className="d-flex">
          <td className="col-4">{registro.local.nome}</td>
          <td className="col-4">{registro.paciente.nome}</td>
          <td className="col-2">{registro.cid10}</td>
          <td className="col-2">
            <button type="button" onClick={() => editar(registro._id)} className="btn btn-warning">Editar</button>
            <button type="button" onClick={() => remove(exibirConfirmModal, registro._id)} className="btn btn-danger">Remover</button>
          </td>
        </tr>
      );
    };
  };

  return (
    <ConfirmModal>
      {({exibirConfirmModal}) => (
      <div>
        <h3 className="text-center">Atendimentos Cadastrados</h3>
        <table className="tabela-usuarios">
          <thead>
            <tr className="d-flex">
              <th className="col-4">Local</th>
              <th className="col-4">Paciente</th>
              <th className="col-2">CID-10</th>
              <th className="col-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {dados.map(renderRegistro(exibirConfirmModal))}
          </tbody>
        </table>
      </div>
      )}
    </ConfirmModal>
  )
}