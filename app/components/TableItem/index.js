import React from 'react';
import styles from './styles.css';

/* NEEDS DEBUGGING */

function TableItem(props) {
  return (
    <li className={props.className || styles.item}>
      <div className={styles.itemContent}>
        {props.item}
      </div>
    </li>
  );
}

TableItem.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.any,
};

export default TableItem;
