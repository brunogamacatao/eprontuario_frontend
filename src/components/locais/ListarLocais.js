import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import LocalService from '../../services/LocalService';

import '../../styles/table_usuarios.scss';
import ConfirmModal from '../util/ConfirmModal';

export default function ListarLocais() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);

  const carregarDados = async () => setDados(await LocalService.listar());

  useEffect(() => {
    carregarDados();
  }, []);

  const remove = async (exibirConfirmModal, id) => {
    exibirConfirmModal('Tem certeza que quer remover esse registro?', async (opcao) => {
      if (opcao === 's') {
        await LocalService.remover(id);
        carregarDados();
      }
    });
  };

  const editar = (id) => {
    navigate(`/local/editar/${id}`, { replace: true });
  };

  const renderRegistro = (exibirConfirmModal) => {
    return (registro) => {
      return (
        <tr key={registro._id} className="d-flex">
          <td className="col-10">{registro.nome}</td>
          <td className="col-2">
            <button type="button" onClick={() => editar(registro.slug)} className="btn btn-warning">Editar</button>
            <button type="button" onClick={() => remove(exibirConfirmModal, registro.slug)} className="btn btn-danger">Remover</button>
          </td>
        </tr>
      );
    };
  };

  return (
    <ConfirmModal>
      {({exibirConfirmModal}) => (
      <div>
        <h3 className="text-center">Locais Cadastrados</h3>
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