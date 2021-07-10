import React, { useState, useRef, useEffect } from 'react';

// 훅스의 경우 : 라이프사이클 없음 

const rspCoords = {  // 좌표 위치
    바위: '0',
    가위:  '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
      })[0];
};

//                      result, imgCord, score  -> hooks : 세로
// componentDidMount
// componentDidUpdate
// componentWillUnmount
// class : 가로

// componentDidMount() {   -> 클래스에서는 한번에 처리
//  this.setStat({
//    imgCord: 3,
//    score: 1,
//    result: 2,
//  })
//}

// useEffect(() => {    -> hooks에서는 useEffect 여러번 사용. []안에 있는거 한 effect에, 나머지 다른 effect
//  setImgCoord();
//  setScore();
// }, [imgCoord, score];
// useEffect(() => {
//  setResult();
// })
// }
const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();
  
    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
      console.log('다시 실행');  // 랜더링 될 때마다(이미지 코드가 바뀔 때마다) useEffect 실행됨 -> componentDidMount와 차이
      interval.current = setInterval(changeHand, 200);  // 실행, 꺼지기 반복하며 setInterval과 같은 효과
      return () => { // componentWillUnmount 역할
        console.log('종료'); 
        clearInterval(interval.current);
      }
    }, [imgCoord]);  // closer문제 해결, udrRffecf를 실행하고 싶은 state
    // 두 번째 인수 배열에 넣은 값(imgCoord)들이 바뀔 때 useEffect가 실행됨

    // useLayoutEffect : 레이아웃의 변화를 감지할 때 / 화면이 바뀌기 전에 발생해서 화면의 변화가 바뀌는 것을 감지
    // useEffect : 화면이 바뀌고 나서 실행, 변경이 있을 때 실행

    const changeHand = () => {
      if (imgCoord === rspCoords.바위) {
        setImgCoord(rspCoords.가위);
      } else if (imgCoord === rspCoords.가위) {
        setImgCoord(rspCoords.보);
      } else if (imgCoord === rspCoords.보) {
        setImgCoord(rspCoords.바위);
      }
    };
    
    const onClickBtn = (choice) => () => {
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
          const myScore = scores[choice];
          const cpuScore = scores[computerChoice(imgCoord)];
          const diff = myScore - cpuScore;
          if (diff === 0) {
            setResult('비겼습니다!');
          } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
          } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
          }
          setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
          }, 1000);
        }
      };
    
      return (
        <>
          <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
          <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
          </div>
          <div>{result}</div>
          <div>현재 {score}점</div>
        </>
      );
    };
    
    export default RSP;