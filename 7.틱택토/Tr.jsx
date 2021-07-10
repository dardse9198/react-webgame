import React, { memo, useMemo } from 'react';  // useMEmo : 값, 컴퍼넌트 자체 기억 -> 바뀌지 않음
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');  // memo로 리랜더링 확인
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        //   useMemo(  -> memo를 적용했는데도 리랜더링이 될 때 사용(컴퍼넌트 자체를 기억)
        //     () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
        //     [rowData[i]],  // 셀 갱신은 rowData[i]가 바뀌었을 때. 칸 내용이 바뀌었을 때만 컴퍼넌트 랜더링하고 그 외에는 랜더링하지 않음
        //   )
        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
      ))}
    </tr>
  );
});

export default Tr;