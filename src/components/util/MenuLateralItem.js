import { Link } from 'react-router-dom';

export default function MenuLateralItem({texto, to}) {
  return (
    <li>
      <Link className="link-dark rounded" to={to}>{texto}</Link>
    </li>
  );
};