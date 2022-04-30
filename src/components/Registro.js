import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Campo from './formulario/Campo';
import LoginService from '../services/LoginService';
import {Alerta, ContextoAlerta} from './util/Alerta';
import Overlay from './util/Overlay';

const criaFormVazio = () => {
  return {nome: '', email: '', senha: '', cofirmaSenha: ''};
};

export default function Registro() {
  return (
    <Overlay> 
      {({exibirOverlay, esconderOverlay}) => (
      <ContextoAlerta> 
        {({setMostraAlerta, setTextoAlerta}) => (
        <>
          <h3 className="text-center">Novo Usuário</h3>
          <Alerta/>
          <Formik 
          initialValues={criaFormVazio()}
          enableReinitialize
          validationSchema={yup.object({
            nome: yup.string().required('O campo nome é requerido'),
            email: yup.string().email('O valor digitado não é um email válido').required('O campo email é requerido'),
            senha: yup.string().required('O campo senha é requerido'),
            cofirmaSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais').required('A confirmação de senha é requerida')
          })}
          onSubmit={async (valores, { setSubmitting, resetForm }) => {
            exibirOverlay('Registrando ...');
            await LoginService.registro(valores);
            setSubmitting(false);
            resetForm();
            setTextoAlerta('Usuário registrado com sucesso !');
            setMostraAlerta(true);
            esconderOverlay();
          }}
          >
            <Form>
              <Campo name="nome" label="Nome" type="text"/>
              <Campo name="email" label="Email" type="email"/>
              <Campo name="senha" label="Senha" type="password"/>
              <Campo name="cofirmaSenha" label="Confirmação da Senha" type="password"/>
              <button type="submit" className="btn btn-primary">Registrar</button>
            </Form>
          </Formik>
        </>
      )} 
      </ContextoAlerta>
    )} 
    </Overlay>
  )
}