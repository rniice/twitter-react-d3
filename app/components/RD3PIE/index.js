import React from 'react';
import { PieChart } from 'react-d3';

import styles from './styles.css';

function RD3PIE(props) {
  var pieData = [
    {label: 'Margarita', value: 20.0},
    {label: 'John', value: 55.0},
    {label: 'Tim', value: 25.0 }
  ];

  //make the properties below be list expansion {...props}
  return (
    <PieChart
      data={pieData}
      width={250}
      height={250}
      radius={70}
      innerRadius={20}
      sectorBorderColor="white"
      /*title="Pie Chart"*/
    />

  );
}

export default RD3PIE;


//{/*<h1 className={styles.heading1} {...props} />*/}
