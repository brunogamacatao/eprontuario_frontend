import '../styles/login.scss';

import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import CampoFlutuante from './formulario/CampoFlutuante';
import BotaoFlutuante from './formulario/BotaoFlutuante';
import { ContextoAlerta, Alerta } from './util/Alerta';

function Login() {
  const navigate = useNavigate();
  const {sessao} = useContext(AppContext);

  return (
    <div className="login text-center">
      <div className="form-signin">
        <ContextoAlerta>
        {({setMostraAlerta, setTextoAlerta, setTipoAlerta}) => (
          <Formik 
          initialValues={{email: '', senha: ''}}
          validationSchema={yup.object({
            email: yup.string().email('O valor digitado não é um email válido').required('O campo email é requerido'),
            senha: yup.string().required('O campo senha é requerido')
          })}
          onSubmit={async (valores, { setSubmitting }) => {
            try {
              await sessao.login(valores);
              navigate('/interna', { replace: true });
            } catch (ex) {
              setTextoAlerta('email ou senha inválidos');
              setTipoAlerta('danger');
              setMostraAlerta(true);
            }
            setSubmitting(false);
          }}
          >

          <Form>
            <h1 className="h3 mb-3 fw-normal">Identifique-se</h1>
            <CampoFlutuante name="email" label="Email" type="email"/>
            <CampoFlutuante name="senha" label="Senha" type="password"/>
            <Alerta/>
            <BotaoFlutuante label="Entrar"/>
          </Form>

          </Formik>
        )}
        </ContextoAlerta>
      </div>
    </div>
  );
}

export default Login;