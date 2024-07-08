import { NavLink } from "react-router-dom";

import styles from './AppHeading.module.css'

const AppHeading = ({ children }) => {
  return (
    <h1 >
      <NavLink className={styles.link} to='/'>
        {children}
      </NavLink>
    </h1>
  );
}

export default AppHeading;