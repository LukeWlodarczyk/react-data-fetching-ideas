import cn from 'classnames';

import styles from './NavDirectionButton.module.css';

import useBackForwardNav from './useBackForwardNav';

export const NAV_BUTTON_DIRECTION = {
  BACK: 'BACK',
  FORWARD: 'FORWARD',
};

const isBack = (type) => type === NAV_BUTTON_DIRECTION.BACK;
const isForward = (type) => type === NAV_BUTTON_DIRECTION.FORWARD;

const NavButton = ({ onClick, type, children, ...props }) => {
  const { canGoBack, goBack, canGoForward, goForward } = useBackForwardNav();

  const handleClick = () => {
    isBack(type) && goBack();
    isForward(type) && goForward();
  };

  const classes = cn(
    styles.navBtn,
    { [styles.backBtn]: isBack(type) },
    { [styles.forwardBtn]: isForward(type) },
    { [styles.hide]: isBack(type) && !canGoBack },
    { [styles.hide]: isForward(type) && !canGoForward }
  );
  const canGo = isBack(type) ? canGoBack : canGoForward;

  return (
    <button
      disabled={!canGo}
      className={classes}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default NavButton;
