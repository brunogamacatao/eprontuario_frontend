import '../../styles/menu_lateral.scss';

export default function BarraDeMenuLateral({children}) {
  return (
    <div id="menu_lateral" className="flex-shrink-1 bg-white shadow">
      <ul className="list-unstyled ps-0">
        {children}
      </ul>
    </div>
  )
}