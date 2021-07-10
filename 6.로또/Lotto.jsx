import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {  // hooks : 조건문 안에 절대X, 함수나 반복문 안에도 웬만해선X
  const lottoNumbers = useMemo(() => getWinNumbers(), []);  // useMemo : getWinNumbers 다시 실행하지 않고 리턴값 기억해둠
    // useMemo : 복잡한 함수 결과값을 기억, 요소가 바뀌기 전까지는 같은 값을 가지고 있음
    // useRef: 일반 값을 기억
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

//   useEffect(() => {
//     // ajax
//   }, []);  // componenetDidMount만 하고 싶을 때

//  <꼼수> - componentDidUpdate만 실행
//   const mounted = useRef(false);
//   useEffect(() => {
//       if(!mounted.current) {
//           mounted.current = true;
//       } else {
//           // ajax
//       }     
//   }, [바뀌는값]);  // componentDidUpdate만 (componentDidMount는 X)

  useEffect(() => {  // componentDid~ hooks로 변경할 때 사용
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);  // 옛날 state 참고 -> 함수형
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
  // current배열이 바뀔 때 useEffect가 componentdidUpadate처럼 실행. useEffect에서 요소 추가하는것은 current 배열의 요소 초가(배열은 바뀌지 않음)

  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {  // useCallback : 함수 자체를 기억하고 있음(useMemo : 함수 리턴값 기억)
    // 함수 컴퍼넌트 전체가 재실행됨. 값을 기억한것처럼 함수 자체를 기억, 함수 컴퍼넌트가 재실행되어도 onClickRedo가 새로 생성되지 않음
    // Balls에서 자식 컴퍼넌트에 함수 넘길때 -> useCallback 필수 적용(적용 안하면 자식이 매번 리랜더링함)
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);  // 두번째 인자가 바뀌면 다시 실행(첫번째 당첨 배열 잊고 새로 작성)

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;