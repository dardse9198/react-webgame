import React, { Component, createRef } from 'react';  // Component 따로 빼는 이유 : 가독성, 재사용성, 성능 최적화
import Try from './Try1';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',  // input창
    answer: getNumbers(), // ex: [1,3,5,7]
    tries: [], // push 쓰면 안 돼요
  };

  onSubmitForm = (e) => {
  };

  onChangeInput = (e) => {  // render같이 리액트에서 제공하는 메서드 아니고 만든 메서드는 => 함수로
  };

  fruits = [
    {fruit: '사과', taste: '맛잇다'}, 
    {fruit: '사과', taste: '맛없다'}, 
    {fruit: '감', taste: '맛잇다'},
    {fruit: '귤', taste: '맛잇다'},
    {fruit: '포도', taste: '맛잇다'},
    {fruit: '배', taste: '맛없다'},
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} /> 
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
            {[['사과', '맛잇다'], 
              ['바나나', '맛없다'], 
              ['포도', '시다'], 
              ['귤', '시다'], 
              ['배', '맛없다'],
            ].map( (v) => {
                return (
                    <li><b>{v[0]}</b> - {v[1]}</li>
                );
            })}

            {[ 
             {fruit: '사과', taste: '맛잇다'}, 
             {fruit: '사과', taste: '맛없다'}, 
             {fruit: '감', taste: '맛잇다'},
             {fruit: '귤', taste: '맛잇다'},
             {fruit: '포도', taste: '맛잇다'},
             {fruit: '배', taste: '맛없다'},
            ].map( (v) => {
                return (
                    <li key={v.fruit + v.taste}><b>{v.fruit}</b> - {v.taste}</li>
                    // key는 고유해야됨(중복X)
                );
            })}

            {[ 
             {fruit: '사과', taste: '맛잇다'}, 
             {fruit: '사과', taste: '맛없다'}, 
             {fruit: '감', taste: '맛잇다'},
             {fruit: '귤', taste: '맛잇다'},
             {fruit: '포도', taste: '맛잇다'},
             {fruit: '배', taste: '맛없다'},
            ].map( (v, i) => (
                <li key={v.fruit + v.taste}><b>{v.fruit}</b> - {v.i}</li>
                // ()함수는 return 생략 가능
                // i : index
            ))}

            {this.fruits.map( (v, i) => {
               return(
                   <Try key={v.fruit + v.taste} value={v} index={i} />
               );
            })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball; 