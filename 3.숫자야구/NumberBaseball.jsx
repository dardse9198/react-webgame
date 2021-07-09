import React, {useRef, useState, useCallback, memo} from 'react';
import Try from "./Try";

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = memo(() => { // hooks -> state, map 다름(props, map은 동일)
  const [answer, setAnswer] = useState(getNumbers());  // getNumbers 통째로 다시 실행됨(해결 : useState, useCallback)
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);  // class에서는 inputRef, outputRef

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setTries((t) => ([  // 옛날 try로 새 try를 만드는 경우에 함수형
        ...t,
        {
          try: value,
          result: '홈런!',
        }
      ]));
      setResult('홈런!');
      alert('게임을 다시 실행합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus();
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        console.log('답은', answer.join(''));
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            console.log('strike', answerArray[i], answer[i]);
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
            ball += 1;
          }
        }
        setTries(t => ([  // 옛날 try로 현재 try를 만들기 때문에 함수형으로 사용
          ...t,
          {
            try: value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`,
          }
        ]));
        setValue('');
        inputEl.current.focus();
      }
    }
  }, [value, answer]);

  const onChangeInput = useCallback((e) => setValue(e.target.value), []);

  // jsx에서 배열 return -> 거의 사용X
  // return [
  //   <div key="사과">사과</div>,  // key 필수
  //   <div key="배">배</div>,
  //   <div key="귤">귤</div>,
  // ];

  return (
    <>  {/* <> </> : 여러 태그 묶을 때 사용 */}
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {/* react에서 for 반복문 사용법 -> 추천X
        {(() => {
          const array = [];
          for(let i=0; i<tries.length; i++) {
            array.push(<Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v}/>);
          }
          return array;
        })()}  // 즉시 실행 함수
        */}
      
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v}/>
        ))}
      </ul>
    </>
  );
});

export default NumberBaseball; 