import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map( (v, i) => i + 1 );
    const shuffle = [];  // shuffle : math.random으로 숫자 하나 뽑아서 옆 배열로 옮김
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p,c) => p-c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),  // 당첨 숫자들
        winBalls: [],
        bonus: null,  // 보너스 공
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
      console.log('runTimeouts');
      const { winNumbers } = this.state;
      for(let i=0; i<winNumbers.length - 1; i++) {  // let 사용하면 closer 문제 안생김
        this.timeouts[i] = setTimeout(() => {
          this.setState((prevState) => {
            return {
              winBalls: [...prevState.winBalls, winNumbers[i]],
            };
          });
        }, (i+1) * 1000);
      }
      this.timeouts[i] = setTimeout( () => {
        this.setState({
          bonus: winNumbers[6],
          redo: true,
        });
      }, 7000);
    };

    conponentDidMount() {
      console.log('didMount');
      this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
      console.log('didUpdate');
      if(this.state.winBalls.length === 0) {  // setState마다 실행되는데 winBalls가 0일때만 runTimeouts이 실행됨
        this.runTimeouts();
      }
      if(prevState.winNumbers !== this.state.winNumbers) {
        console.log('로또 숫자를 생성합니다.');
      }
    }

    componentWillunmount() {
      this.timeouts.forEach((v) => {
        clearTimeout(v);
      });
    }

    onClickRedo = () => {  // 한번 더 누른 경우 초기화
      console.log('onClickRedo');
      this.setState({
        winNumbers: getWinNumbers(),  // 당첨 숫자들
        winBalls: [],
        bonus: null,
        redo: false,
      });
      this.timeouts = [];
    }
    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
          <>
            <div>당첨 숫자</div>
            <div id="결과창">
              {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
          </>
        );
    }
  }

export default Lotto;