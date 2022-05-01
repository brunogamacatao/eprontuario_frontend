import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import PacienteService from '../../services/PacienteService';
import {Alerta, ContextoAlerta} from '../util/Alerta';
import Overlay from '../util/Overlay';
import Campo from '../formulario/Campo';
import { useEffect, useState } from 'react';

const criaFormVazio = () => {
  return {nome: '', cpf: '', endereco: '', dataDeNascimento: ''};
};

const converteData = (data) => new Date(data).toISOString().slice(0, 10);

export default function FormPaciente() {
  const navigate = useNavigate();
  const { pacienteId } = useParams();
  const [dadosForm, setDadosForm] = useState(criaFormVazio());
  const [editando, setEditando] = useState(false);  

  useEffect(() => {
    let fetchData = async () => {
      if (pacienteId) {
        let dados = await PacienteService.get(pacienteId);
        setDadosForm({...dados, dataDeNascimento: converteData(dados.dataDeNascimento)});
        setEditando(true);
      }  
    };
    fetchData();
  }, []);

  const voltar = (evt) => {
    evt.preventDefault(); 
    navigate('/paciente/listar', { replace: true });
  };

  return (
    <Overlay> 
      {({exibirOverlay, esconderOverlay}) => (
      <ContextoAlerta> 
        {({setMostraAlerta, setTextoAlerta}) => (
          <>
            {editando || <h3>Novo Paciente</h3>}
            {editando && <h3>Alterar Paciente</h3>}
            <Alerta/>
            <hr/>
            <Formik 
              initialValues={dadosForm}
              enableReinitialize
              validationSchema={yup.object({
                nome: yup.string().required('O campo nome é requerido'),
                endereco: yup.string().required('O campo endereço é requerido')
              })}
              onSubmit={async (dados, { setSubmitting, resetForm }) => {
                exibirOverlay('Cadastrando ...');

                if (editando) {
                  await PacienteService.editar(pacienteId, dados);
                } else {
                  await PacienteService.cadastrar(dados);
                }

                setSubmitting(false);
                resetForm();
                setTextoAlerta('Paciente salvo com sucesso !');
                setMostraAlerta(true);
                esconderOverlay();

                if (editando) {
                  navigate('/paciente/listar', { replace: true });
                }
              }}
             >
                <Form>
                  <Campo name="nome" label="Nome" type="text"/>
                  <Campo name="dataDeNascimento" label="Data de Nascimento" type="date"/>
                  <Campo name="cpf" label="CPF" type="text"/>
                  <Campo name="endereco" label="Endereço" type="text"/>
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