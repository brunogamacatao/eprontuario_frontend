import React, {useEffect, useState} from 'react'
import UsuariosService from '../services/UsuarioService';

import '../styles/table_usuarios.scss';
import ConfirmModal from './util/ConfirmModal';

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = async () => setUsuarios(await UsuariosService.getUsuarios());

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const bloqueia = (exibirConfirmModal, id) => {
    exibirConfirmModal('Tem certeza que quer bloquear esse usuário?', async (opcao) => {
      if (opcao === 's') {
        console.log('bloqueando o usuário com id', id);
        await UsuariosService.bloqueia(id);
        carregarUsuarios();
      }
    });
  };

  const desbloqueia = (exibirConfirmModal, id) => {
    exibirConfirmModal('Tem certeza que quer desbloquear esse usuário?', async (opcao) => {
      if (opcao === 's') {
        await UsuariosService.desbloqueia(id);
        carregarUsuarios();
      }
    });
  };

  const remove = (exibirConfirmModal, id) => {
    exibirConfirmModal('Tem certeza que quer remover esse usuário?', async (opcao) => {
      if (opcao === 's') {
        carregarUsuarios();
      }
    });
  };

  const renderUsuario = (exibirConfirmModal) => {
    return (usuario) => {
      return (
        <tr key={usuario._id}>
          <td>{usuario.email}</td>
          <td>{usuario.role}</td>
          <td>{usuario.bloqueado ? 'Sim' : 'Não'}</td>
          <td>
            {usuario.bloqueado ? (
              <button type="button" onClick={() => desbloqueia(exibirConfirmModal, usuario._id)} className="btn btn-success">Desbloquear</button>
            ) : (
              <button type="button" onClick={() => bloqueia(exibirConfirmModal, usuario._id)} className="btn btn-warning">Bloquear</button>
            )}
            <button type="button" onClick={() => remove(exibirConfirmModal, usuario._id)} className="btn btn-danger">Remover</button>
          </td>
        </tr>
      );
    };
  };

  return (
    <ConfirmModal>
      {({exibirConfirmModal}) => (
      <div>
        <h3 className="text-center">Usuários Cadastrados</h3>
        <table className="tabela-usuarios">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Bloqueado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(renderUsuario(exibirConfirmModal))}
          </tbody>
        </table>
      </div>
      )}
    </ConfirmModal>
  )
}