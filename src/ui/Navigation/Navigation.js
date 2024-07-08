import { NavLink } from "react-router-dom";

import styles from './Navigation.module.css'

const Navigation = ({ links }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {links.map(({ path, name }) => <li className={styles.item} key={path}><NavLink className={styles.link} to={path}>{name}</NavLink></li>)}
      </ul>
    </nav>
  );
}

export default Navigation;