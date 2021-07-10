import React, { memo } from 'react';  // 함수 컴퍼넌트(hooks 아님)

const Ball = memo(({ number }) => {  // state 안쓰면 함수 컴퍼넌트로, react.memo로 감싸서 purecomponent 적용(하이오더 컴퍼넌트)
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    <div className="ball" style={{ background }}>{number}</div>
  )
});

export default Ball;