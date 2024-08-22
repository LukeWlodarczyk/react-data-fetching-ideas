import cn from 'classnames';
import styles from './Icon.module.css';

const Icon = ({ name, size = 'medium' }) => (
  <div className={cn(styles[name], styles[size])}></div>
);

export default Icon;
