import React from 'react';

const Td = ({ rowIndex, cellIndex }) => {
    const onClickTd = useCallback( () => {
        console.log(rowIndex, cellIndex);
        dispatchEvent({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, []);
    
    return(
        <td>{''}</td>
    )
};

export default Td;

