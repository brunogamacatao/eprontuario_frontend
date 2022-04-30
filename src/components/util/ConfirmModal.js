import * as bootstrap from 'bootstrap/dist/js/bootstrap';

import React, {useState} from 'react'

let _modal = null;
let _callback = null;

const ConfirmModalContext = React.createContext();

const ConfirmModal = ({children}) => {
  const [opcaoConfirmModal, setOpcaoConfirmModal] = useState('n');
  const [textoConfirmModal, setTextoConfirmModal] = useState('Tem certeza ?');

  const exibirConfirmModal = (msg, callback) => {
    _callback = callback;
    setTextoConfirmModal(msg);
    if (!_modal) {
      _modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    }
    _modal.show();
  };

  const esconderConfirmModal = () => {
    if (!_modal) {
      _modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    }
    _modal.hide();
  };

  const clicaSim = () => {
    setOpcaoConfirmModal('s');
    esconderConfirmModal();
    _callback('s');
  };

  const clicaNao = () => {
    setOpcaoConfirmModal('n');
    esconderConfirmModal();
    _callback('n');
  };

  return (
    <>
      <div className="modal" tabIndex="-1" id="confirmModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Tem certeza ?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{textoConfirmModal}</p>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => clicaSim()} className="btn btn-warning"   data-bs-dismiss="modal">Sim</button>
              <button type="button" onClick={() => clicaNao()} className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModalContext.Provider value={{exibirConfirmModal, esconderConfirmModal, opcaoConfirmModal}}>
        <ConfirmModalContext.Consumer>
          {context => children(context)}
        </ConfirmModalContext.Consumer>
      </ConfirmModalContext.Provider>
    </>
  );
};

export default ConfirmModal;