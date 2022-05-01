import { Outlet } from 'react-router-dom';
import BarraDeMenuLateral from "./util/BarraDeMenuLateral";
import MenuLateral from "./util/MenuLateral";
import MenuLateralItem from "./util/MenuLateralItem";
import '../styles/principal.scss';

export default function Principal() {
  return (
    <div id="principal">
      <BarraDeMenuLateral>
        <MenuLateral texto="Locais">
          <MenuLateralItem to="local/novo" texto="Cadastrar"/>
          <MenuLateralItem to="local/listar" texto="Consultar"/>
        </MenuLateral>
        <MenuLateral texto="Pacientes">
          <MenuLateralItem to="paciente/novo" texto="Cadastrar"/>
          <MenuLateralItem to="paciente/listar" texto="Consultar"/>
        </MenuLateral>
        <MenuLateral texto="Atendimentos">
          <MenuLateralItem to="atendimento/novo" texto="Novo"/>
          <MenuLateralItem to="atendimento/listar" texto="Consultar"/>
        </MenuLateral>
      </BarraDeMenuLateral>
      <div id="conteudo">
        <Outlet />
      </div>
    </div>
  )
}