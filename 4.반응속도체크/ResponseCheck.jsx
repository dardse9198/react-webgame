import React, { useStste } from 'react';

const ResponseCheck = () => {
    const [state, useState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);
    // 클래스에서는(extends Component) timeout; endTime; startTime; 적어줌
    // hooks로 표현할 때는 Ref 사용(Ref 기능 : 1. dom접근, 2. hooks에서 this의 속성들 표현)
    // state와 Ref 차이점 : 
    // state - 위에 setState, setMessate, setResult하면 return 부분 다시 실행(랜더링) 
    // ref - useRef로 값을 바꿀 때는 return 다시 실행 안함(값이 바뀌어도 화면에 영향 미치고 싶지 않을 때 ref사용)

    const onClickScreen = useCallback(() => {
        if (state === 'waiting') {
          timeout.current = setTimeout(() => {
            setState('now');
            setMessage('지금 클릭');
            startTime.current = new Date();  // useRef기 때문에 time.current에 넣어주어야 함
          }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
          setState('ready');
          setMessage('초록색이 되면 클릭하세요.');
        } else if (state === 'ready') { // 성급하게 클릭
          clearTimeout(timeout.current);  // 값을 가져올 때도 current 사용
          setState('waiting');
          setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
          endTime.current = new Date();
          setState('waiting');
          setMessage('클릭해서 시작하세요.');
          setResult((prevResult) => {  // 예전 state 참고 -> prevResult
            return [...prevResult, endTime.current - startTime.current];
          });
        }
    }, [state]);

    const onReset = useCallback(() => {
        setResult([]);
    }, []);
    
    const renderAverage = () => {
        return result.length === 0
          ? null
          : <>
            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={onReset}>리셋</button>
          </>
    };
    
    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={onClickScreen}
        >
          {message}
        </div>
          {renderAverage()}
        </>
      );
    };
    
export default ResponseCheck;