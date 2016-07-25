import React from 'react';
import styles from './styles.css';

/* NEEDS DEBUGGING */

function Table(props) {
  const ComponentToRender = props.component;
  let content = (<div></div>);

  // If we have items, render them
  if (props.items) {
    content = props.items.map((item, index) => (
      <ComponentToRender key={`item-${index}`} item={item} />
    ));
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender />);
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.list}>
        {content}
      </table>
    </div>
  );
}

Table.propTypes = {
  component: React.PropTypes.func.isRequired,
  items: React.PropTypes.array,
};

export default Table;
