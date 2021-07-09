import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    }

    timeout;  // this.timeout 선언
    startTime;  // state로 하면 랜더링이 일어남
    endTime;

    onClickScreen = () => {
        const { state } = this.state;
        if (state === 'waiting') {
          timeout.current = setTimeout(() => {
            this.setState({
              state: 'now',
              message: '지금 클릭',
            });
            this.startTime = new Date(); 
          }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤시간 후에 초록색으로 바꿈
          this.setState({
            state: 'ready',
            message: '초록색이 되면 클릭하세요.',
          });
        } else if (state === 'ready') { // 성급하게 클릭
          clearTimeout(this.timeout);  // this.timeout 초기화(waiting으로 돌아가서 처음부터 시작)
          this.setState({
            state: 'waiting',
            message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.', 
          });
        } else if (state === 'now') { // 반응속도 체크
          endTime.current = new Date();
          this.setState((prevState) => {
            return {
              state: 'waiting',  // 초기 화면
              message: '클릭해서 시작하세요.',
              result: [...prevState.result, this.endTime, this.startTime],  // 옛날 배열에 추가(push)
            };
          });
        }
      };
    
      onReset = () => {
        this.setState({
          result: [],
        });
      };

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0  // 조건문 : 삼항연산자 사용
            ? null  // 0이면 아무것도 안함
            : <> 
              <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div> 
              {/* 0이 아니면 실행 */}
           ㅡ <button onClick={this.onReset}>리셋</button>
            </>
    };
    
    render() {
        const { state, message } = this.state;
        return (
            <>
            <div
              id="scrren"
              className={state} 
              onClick={this.onClickSreen}
            >
                {message}
            </div>
            {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;