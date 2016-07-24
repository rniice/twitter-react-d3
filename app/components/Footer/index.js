import React from 'react';

import A from 'components/A';
import styles from './styles.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>MIT License Code and Boilerplate.</p>
      </section>
      <section>
        <p>Made by Michael Crockett. Built with <A href="https://github.com/mxstbr/react-boilerplate">react-boilerplate</A>.</p>
      </section>
    </footer>
  );
}

export default Footer;
