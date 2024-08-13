import { useState } from 'react';
import cn from 'classnames';

import NavDirectionButton, { NAV_BUTTON_DIRECTION } from './NavDirectionButton';
import ToggleNavButton from './ToggleNavButton';
import NavLinks from './NavLinks';

import styles from './Navigation.module.css';

const Navigation = ({ links }) => {
  const [isOpen, setIsopen] = useState(true);
  const toggleNav = () => setIsopen((t) => !t);

  return (
    <nav className={cn(styles.nav, { [styles.closed]: !isOpen })}>
      <NavDirectionButton type={NAV_BUTTON_DIRECTION.BACK} />
      <NavDirectionButton type={NAV_BUTTON_DIRECTION.FORWARD} />
      <ul className={styles.list}>
        <NavLinks links={links} />
      </ul>
      <ToggleNavButton onClick={toggleNav} />
    </nav>
  );
};

export default Navigation;
