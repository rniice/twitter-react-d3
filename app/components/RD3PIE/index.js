import React from 'react';
import { PieChart } from 'react-d3';

import styles from './styles.css';

function RD3PIE(props) {
  let data = props.items;

  let label_prop = 'text'
  let value_prop = 'retweet_count'
  let pieData = [];
  let total_retweets = null;

  //need to get total retweets to determine fractions of pie
  for(let i=0; i<data.length; i++) {
      total_retweets += props.items[i][value_prop];
  }

  for(let k=0; k<data.length; k++) {
      pieData.push( {
          label: props.items[k][label_prop],
          value: parseInt(props.items[k][value_prop] * 100/total_retweets)
      });
  }

  console.log(pieData);

  /* example pieData format
  let pieData = [
    {label: 'Margarita', value: 20.0},
    {label: 'John', value: 55.0},
    {label: 'Tim', value: 25.0 }
  ];
  */

  //make the properties below be list expansion {...props}
  return (
    <PieChart
      data={pieData}
      width={800}
      height={800}
      radius={200}
      innerRadius={20}
      sectorBorderColor="white"
      /*title="Pie Chart"*/
    />

  );
}

export default RD3PIE;


//{/*<h1 className={styles.heading1} {...props} />*/}
