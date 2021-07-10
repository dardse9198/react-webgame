import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return (
    <table onClick={onClick}>
      {Array(tableData.length).fill().map( (tr, i) => (<Tr rowData={tableData[i]} />))}
    </table>
  );
};

export default Table;