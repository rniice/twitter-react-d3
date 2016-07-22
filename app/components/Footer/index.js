import React from 'react';

import A from 'components/A';
import styles from './styles.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>This project is licensed under the MIT license.</p>
      </section>
      <section>
        <p>Made using <A href="https://github.com/mxstbr/react-boilerplate">react-boilerplate</A>.</p>
      </section>
    </footer>
  );
}

export default Footer;
