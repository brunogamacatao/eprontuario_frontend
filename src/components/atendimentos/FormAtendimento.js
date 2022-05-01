import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import LocalService from '../../services/LocalService';
import PacienteService from '../../services/PacienteService';
import AtendimentoService from '../../services/AtendimentoService';
import {Alerta, ContextoAlerta} from '../util/Alerta';
import Overlay from '../util/Overlay';
import Campo from '../formulario/Campo';
import { useEffect, useState } from 'react';
import CampoSelect from '../formulario/CampoSelect';

const criaFormVazio = () => {
  return {cid10: '', textoCid10: '', subjetivo: '', objetivo: '', avaliacao: '', plano: '', local: null, paciente: null};
};

export default function FormAtendimento() {
  const navigate = useNavigate();
  const { atendimentoId } = useParams();
  const [dadosForm, setDadosForm] = useState(criaFormVazio());
  const [editando, setEditando] = useState(false);  

  const [locais, setLocais] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      if (atendimentoId) {
        setDadosForm(await AtendimentoService.get(atendimentoId));
        setEditando(true);
      }
      
      setLocais(await LocalService.listar());
      setPacientes(await PacienteService.listar());
    };
    fetchData();
  }, []);

  const voltar = (evt) => {
    evt.preventDefault(); 
    navigate('/atendimento/listar', { replace: true });
  };

  const renderLocal = (l) => {
    return <option key={l._id} value={l.slug}>{l.nome}</option>
  };

  const renderPaciente = (p) => {
    return <option key={p._id} value={p._id}>{p.nome}</option>
  };

  return (
    <Overlay> 
      {({exibirOverlay, esconderOverlay}) => (
      <ContextoAlerta> 
        {({setMostraAlerta, setTextoAlerta}) => (
          <>
            {editando || <h3>Novo Atendimento</h3>}
            {editando && <h3>Alterar Atendimento</h3>}
            <Alerta/>
            <hr/>
            <Formik 
              initialValues={dadosForm}
              enableReinitialize
              validationSchema={yup.object({
                cid10: yup.string().required('O campo CID10 é requerido'),
                local: yup.string().required('O campo local é requerido'),
                paciente: yup.string().required('O campo paciente é requerido')
              })}
              onSubmit={async (dados, { setSubmitting, resetForm }) => {
                exibirOverlay('Cadastrando ...');

                console.log(dados);

                if (editando) {
                  await AtendimentoService.editar(dados.local, dados.paciente, atendimentoId, dados);
                } else {
                  await AtendimentoService.cadastrar(dados.local, dados.paciente, dados);
                }

                setSubmitting(false);
                resetForm();
                setTextoAlerta('Atendimento salvo com sucesso !');
                setMostraAlerta(true);
                esconderOverlay();

                if (editando) {
                  navigate('/atendimento/listar', { replace: true });
                }
              }}
             >
                <Form>
                  <CampoSelect name="local" label="Local">
                    { locais.map(renderLocal) }
                  </CampoSelect>
                  <CampoSelect name="paciente" label="Paciente">
                    { pacientes.map(renderPaciente) }
                  </CampoSelect>
                  <Campo name="cid10"      label="CID-10"        type="text"/>
                  <Campo name="textoCid10" label="Descrição CID" type="text"/>
                  <Campo name="subjetivo"  label="Subjetivo"     type="text"/>
                  <Campo name="objetivo"   label="Objetivo"      type="text"/>
                  <Campo name="avaliacao"  label="Avaliação"     type="text"/>
                  <Campo name="plano"      label="Plano"         type="text"/>
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