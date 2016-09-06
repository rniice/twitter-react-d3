import React, { PropTypes } from 'react';
import { PieChart } from 'react-d3';
import styles from './styles.css';

function RD3PIE(props) {
  const data = props.items;
  const textProp = 'text';
  const valueProp = 'retweet_count';
  const pieData = [];
  const tableDataJSX = [];
  let totalRetweets = 0;

  // need to get total retweets to determine fractions of pie
  for (let i = 0; i < data.length; i++) {
    totalRetweets += props.items[i][valueProp];
  }

  for (let k = 0; k < data.length; k++) {
    const tweetURL = 'http://twitter.com/${props.items[k].user.screen_name}/status/${props.items[k].id_str}';

    pieData.push({
      label: '@${props.items[k].user.screen_name}',
      value: parseInt(props.items[k][valueProp] * 100 / totalRetweets, 10),
    });

    tableDataJSX.push(
      <tr key={k}>
        <td> <a href={tweetURL} target="_blank">{'@${props.items[k].user.screen_name'}</a> </td>
        <td>{parseInt(props.items[k][valueProp], 10)}</td>
        <td>{props.items[k][textProp]}</td>
      </tr>
    );
  }

  // make the properties below be list expansion {...props}
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
      />
      <table className={styles}>
        <thead>
          <tr>
            <th>username</th>
            <th>retweets</th>
            <th>text snippet</th>
          </tr>
        </thead>
        <tbody>
          {tableDataJSX}
        </tbody>
      </table>
    </div>
  );
}

RD3PIE.propTypes = {
  items: PropTypes.any,
};

export default RD3PIE;


// {<h1 className={styles.heading1} {...props} />}
