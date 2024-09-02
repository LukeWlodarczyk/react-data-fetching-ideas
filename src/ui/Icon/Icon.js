import cn from 'classnames';
import styles from './Icon.module.css';

const Icon = ({ name, size = 'medium', className }) => (
  <div className={cn(styles[name], styles[size], className)}></div>
);

export default Icon;
