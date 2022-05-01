import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import LocalService from '../../services/LocalService';
import {Alerta, ContextoAlerta} from '../util/Alerta';
import Overlay from '../util/Overlay';
import Campo from '../formulario/Campo';
import { useEffect, useState } from 'react';

const criaFormVazio = () => {
  return {nome: '', cabecalho: '', rodape: ''};
};

export default function FormLocal() {
  const navigate = useNavigate();
  const { localId } = useParams();
  const [dadosForm, setDadosForm] = useState(criaFormVazio());
  const [editando, setEditando] = useState(false);  

  useEffect(() => {
    let fetchData = async () => {
      if (localId) {
        setDadosForm(await LocalService.get(localId));
        setEditando(true);
      }  
    };
    fetchData();
  }, []);

  const voltar = (evt) => {
    evt.preventDefault(); 
    navigate('/local/listar', { replace: true });
  };

  return (
    <Overlay> 
      {({exibirOverlay, esconderOverlay}) => (
      <ContextoAlerta> 
        {({setMostraAlerta, setTextoAlerta}) => (
          <>
            {editando || <h3>Novo Local</h3>}
            {editando && <h3>Alterar Local</h3>}
            <Alerta/>
            <hr/>
            <Formik 
              initialValues={dadosForm}
              enableReinitialize
              validationSchema={yup.object({
                nome: yup.string().required('O campo nome é requerido')
              })}
              onSubmit={async (dados, { setSubmitting, resetForm }) => {
                exibirOverlay('Cadastrando ...');

                if (editando) {
                  await LocalService.editar(localId, dados);
                } else {
                  await LocalService.cadastrar(dados);
                }

                setSubmitting(false);
                resetForm();
                setTextoAlerta('Local salvo com sucesso !');
                setMostraAlerta(true);
                esconderOverlay();

                if (editando) {
                  navigate('/local/listar', { replace: true });
                }
              }}
             >
                <Form>
                  <Campo name="nome" label="Nome" type="text"/>
                  <Campo name="cabecalho" label="Cabeçalho" type="text"/>
                  <Campo name="rodape" label="Rodapé" type="text"/>
                  { editando || <button type="submit" className="btn btn-primary">Cadastrar</button>}
                  { editando && <>
                      <button type="submit" className="btn btn-warning">Salvar</button>
                      &nbsp;
                      <button className="btn btn-primary" onClick={voltar}>Voltar</button>
                    </>}
                </Form>
            </Formik>
          </>
        )}
      </ContextoAlerta>
    )} 
    </Overlay>
  );
};