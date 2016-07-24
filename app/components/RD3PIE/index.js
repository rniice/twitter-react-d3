import React from 'react';
import { PieChart } from 'react-d3';
//import Table from 'components/Table';
//import TableItem from 'components/TableItem';
import styles from './styles.css';

function RD3PIE(props) {
  let data = props.items;

  let text_prop = 'text'
  let value_prop = 'retweet_count'
  let pieData = [];
  let tableData = [];
  let tableDataJSX = [];

  let total_retweets = null;

  //need to get total retweets to determine fractions of pie
  for(let i=0; i<data.length; i++) {
      total_retweets += props.items[i][value_prop];
  }

  for(let k=0; k<data.length; k++) {
      pieData.push({
          //label: props.items[k][text_prop],
          label: '@' + props.items[k].user.screen_name,
          value: parseInt(props.items[k][value_prop] * 100/total_retweets)
      });

      tableDataJSX.push(
        <tr key={k}>
          <td>{'@' + props.items[k].user.screen_name}</td>
          <td>{parseInt(props.items[k][value_prop])}</td>
          <td>{props.items[k][text_prop]}</td>
        </tr>
      );
  }

  //make the properties below be list expansion {...props}
  return (
    <div>
      <PieChart
        data={pieData}
        width={500}
        height={300}
        radius={100}
        innerRadius={20}
        sectorBorderColor="white"
        labelTextFill="#55ACEE"
        /*title="Pie Chart"*/
      />
      <table>
        <tr>
          <th>username</th>
          <th>retweets</th>
          <th>text snippet</th>
        </tr>
        {tableDataJSX}
      </table>

      {/*<Table items={tableData} component={TableItem} />*/}
    </div>
  );
}

export default RD3PIE;


//{/*<h1 className={styles.heading1} {...props} />*/}
