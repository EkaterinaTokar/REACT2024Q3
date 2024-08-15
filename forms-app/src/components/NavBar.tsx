import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/uncontrolledForm">Form1</NavLink>
        </li>
        <li>
          <NavLink to="/reactHookForm">Form2</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
