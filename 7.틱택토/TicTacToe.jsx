import React, { useEffect } from 'react';
import Table from './Table';

const initialState = {  // state를 모아두고 action을 통해서만 바꿈
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1],
};

const SET_WINNER = 'SET_WINNER';  // state를 바꾸고 싶을 때마다 action 만들어나감
const CLICK_CELL = 'CLICK_CELL';
const CHANGE_TURN = 'CHANGE_TURN';
const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch(action.type) {  // action을 실행하면 action.type으로 액션 타입 구분하고
        case SET_WINNER : { // 'SET WINNER'면 state를
        // state.winner = action.winner; 이렇게 하면 안됨
            return {  // 새로운 객체를 만들어서 바뀐 값만 바꿔줌
                ...state,  // 기존 state 복사
                winner: action.winner,  // 바뀌는 부분
            };
        }
        case CLICK_CELL : {
            const tableData = [...state.tableData];  // 기존의 테이블 데이터 얕은 복사
            tableData[action.row] = [...tableData[action.row]];  // td에서 넣어주었던 몇번째 줄, 객체 있으면 불변성 지키기 위해 얕은 복사 해주어야함
                                                                 // -> immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;  // O면 O가, X면 X가 들어감
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN : {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME: {
            return {
              ...state,
              turn: 'O',
              tableData: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
              ],
              recentCell: [-1, -1],
            };
        }
        default:
            return state;
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    const onClickTable = useCallback( () => {
        dispatch({ type: 'SET_WINNER', winner: 'O' });  // type -> action.type, winner -> action.winner가 됨
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
          return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
          win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
          win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
          win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
          win = true;
        }
        console.log(win, row, cell, tableData, turn);
        if (win) { // 승리시
          dispatch({ type: SET_WINNER, winner: turn });
          dispatch({ type: RESET_GAME });
        } else {
          let all = true; // all이 true면 무승부라는 뜻
          tableData.forEach((row) => { // 무승부 검사
            row.forEach((cell) => {
              if (!cell) {
                all = false;
              }
            });
          });
          if (all) {
            dispatch({ type: SET_WINNER, winner: null });
            dispatch({ type: RESET_GAME });
          } else {
            dispatch({ type: CHANGE_TURN });
          }
        }
      }, [recentCell]);  // 클릭한 cell이 바뀔 때마다 검사

    return(
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;