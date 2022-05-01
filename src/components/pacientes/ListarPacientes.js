import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PacienteService from '../../services/PacienteService';

import '../../styles/table_usuarios.scss';
import ConfirmModal from '../util/ConfirmModal';

export default function ListarPacientes() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);

  const carregarDados = async () => setDados(await PacienteService.listar());

  useEffect(() => {
    carregarDados();
  }, []);

  const remove = async (exibirConfirmModal, id) => {
    exibirConfirmModal('Tem certeza que quer remover esse registro?', async (opcao) => {
      if (opcao === 's') {
        await PacienteService.remover(id);
        carregarDados();
      }
    });
  };

  const editar = (id) => {
    navigate(`/paciente/editar/${id}`, { replace: true });
  };

  const renderRegistro = (exibirConfirmModal) => {
    return (registro) => {
      return (
        <tr key={registro._id} className="d-flex">
          <td className="col-10">{registro.nome}</td>
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
        <h3 className="text-center">Pacientes Cadastrados</h3>
        <table className="tabela-usuarios">
          <thead>
            <tr className="d-flex">
              <th className="col-10">Nome</th>
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