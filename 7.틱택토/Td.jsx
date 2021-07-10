import React, { useCallback, memo } from 'react';  // memo : 주로 반복문 있을때 사용
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    console.log('td rendered');  // memo로 리랜더링 확인

    const onClickTd = useCallback( () => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;  // 이미 클릭
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });  // 어떤 칸을 누름, 비동기적으로 바뀜
        dispatch({ type: CHANGE_TURN });  // 턴을 바꿈
    }, [cellData]);
    
    return(
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;

/*
useCallback이 내부 함수를 기억하는데 기억력이 너무 강력해서 가끔 함수를 새로 만들 필요있음(초기화) 
함수 새로 만드는 경우 : cellData가 바뀔 때마다 기억해놨던 함수 새로 만듦 
    -> 기억하는 이유 : 함수를 props로 넣어줄 때 불필요한 랜더링이 발생
기억력이 너무 뛰어나면 내부의 데이터가 처음 데이터를 사용하고 바뀌는 데이터 감지 못함
    -> 바뀔 여지가 있는 데이터는 cellData에 넣어주면 됨
=> props에 넣어두는 데이터는 useCallback으로 감싸고, 계속 바뀌는(최소 한번) 데이터는 input에([]) 넣어주면 됨
*/
