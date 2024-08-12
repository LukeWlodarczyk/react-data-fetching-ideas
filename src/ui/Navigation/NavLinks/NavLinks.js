import { NavLink } from 'react-router-dom';

import styles from './NavLinks.module.css';

const NavLinks = ({ links }) =>
  links.map(({ path, name, preload }) => (
    <li onMouseEnter={preload} className={styles.item} key={path}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
        to={path}
      >
        {name}
      </NavLink>
    </li>
  ));

export default NavLinks;
