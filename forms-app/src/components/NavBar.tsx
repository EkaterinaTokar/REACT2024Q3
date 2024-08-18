import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function NavBar() {
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.navbar}`}>
        <ul className={`${styles.navbarList}`}>
          <li className={`${styles.navbarItem}`}>
            <NavLink to="/" className={`${styles.navbarLink}`}>
              Home
            </NavLink>
          </li>
          <li className={`${styles.navbarItem}`}>
            <NavLink to="/uncontrolledForm" className={`${styles.navbarLink}`}>
              Form1
            </NavLink>
          </li>
          <li className={`${styles.navbarItem}`}>
            <NavLink to="/reactHookForm" className={`${styles.navbarLink}`}>
              Form2
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
