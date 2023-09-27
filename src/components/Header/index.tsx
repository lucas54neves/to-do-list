import styles from './index.module.css';

import rocket from '../../assets/rocket.svg';

export const Header = () => (
  <header className={styles.header}>
    <img src={rocket} alt='Rocket' className={styles.rocket} />
    <span>to</span>
    <span>do</span>
  </header>
);
