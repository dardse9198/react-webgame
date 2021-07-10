import React from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
};

const SET_WINNER = 'SET_WINNER';  // state를 바꾸고 싶을 때마다 action 만들어나감
const CLICK_CELL = 'CLICK_CELL';

const reducer = (state, action) => {
    switch(action.type) {  // action을 실행하면 action.type으로 액션 타입 구분하고
        case SET_WINNER :  // 'SET WINNER'면 state를
        // state.winner = action.winner; 이렇게 하면 안됨
            return {  // 새로운 객체를 만들어서 바뀐 값만 바꿔줌
                ...state,  // 기존 state 복사
                winner: action.winner,  // 바뀌는 부분
            };
        case CLICK_CELL :
            const tableData = [...state.tableData];  // 기존의 테이블 얕은 복사
            tableData[action.row] = [...tableData[action.row]];  // td에서 넣어주었던 몇번째 줄, 객체 있으면 불변성 지키기 위해 얕은 복사 해주어야함
                                                                 // -> immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;

            return {
                ...state,
            };
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    const onClickTable = useCallback( () => {
        dispatch({ type: 'SET_WINNER', winner: 'O' });  // type -> action.type, winner -> action.winner가 됨
    })
    return(
        <>
            <Table onClick={onClickTable} tableData={state.tableData}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;