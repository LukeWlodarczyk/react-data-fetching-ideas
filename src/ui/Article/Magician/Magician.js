import { useInView } from 'react-intersection-observer';
import cn from 'classnames';

import { ReactComponent as MagicianIcon } from './svg/magician.svg';

import styles from './Magician.module.css';

const Magician = () => {
  const { ref, inView } = useInView({ rootMargin: '-30% 0% -30% 0%' });

  return (
    <MagicianIcon
      ref={ref}
      className={cn(styles.magician, { [styles.animate]: inView })}
    />
  );
};

export default Magician;
