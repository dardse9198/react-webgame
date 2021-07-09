import React, { Component } from 'react';

// 클래스의 경우 : constructor, method 실행(클래스에 붙음) -> 처음으로 render -> ref 설정 -> componentDidMount
//  (setState/props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
//  부모가 나를 없앴을 때 -> componentWillUnmount -> 화면에서 소멸

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

class RSP extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0,
    };

    interval;

    // component가 client에서 불려와서 랜더링 될 때 dom에 붙는 순간에
    // (render 함수가 실행되면 react가 jsx를 dom에 붙여줌) 특정한 동작을 할 수 있음
    componentDidMount() {  // 컴포넌트가 첫 랜더링된 후 (render가 처음 실행되고 성공적으로 수행됐으면 실행됨(재린더링시X))
        this.interval = setInterval(this.changeHand, 300);  // componentDidMount에서는 비동기 요청 많이 함
        // 비동기 함수 밖의 변수를 참조하면 closer 발생(함수 안으로 변수 넣어야 함)  
    }

    componentDidUpdate() {  // 리랜더링 후
    }

    componentWillUnmount() {  // 부모가 제거할 때, 컴포넌트가 제거되기 직전(componentdidmount에서 했던 작업 제거)
       clearInterval(this.interval); // componentWillInmount에서는 비동기 요청 정리 많이 함
    }

    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
          this.setState({
            imgCoord: rspCoords.가위,
          });
        } else if (imgCoord === rspCoords.가위) {
          this.setState({
            imgCoord: rspCoords.보,
          });
        } else if (imgCoord === rspCoords.보) {
          this.setState({
            imgCoord: rspCoords.바위,
          });
        }
    };
    
    onClickBtn = (choice) => {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
          this.setState({
            result: '비겼습니다!',
          });
        } else if ([-1, 2].includes(diff)) {
          this.setState((prevState) => {
            return {
              result: '이겼습니다!',
              score: prevState.score + 1,
            };
          });
        } else {
          this.setState((prevState) => {
            return {
              result: '졌습니다!',
              score: prevState.score - 1,
            };
          });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 300);
        }, 1500);
    };

    render() {
        const { result, score, imgCoord } = this.state;
        // this.setState({});  // 불가능 -> 무한 랜더링 / componentDidMount에서 사용 가능

        return (
            <>
              <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
              <div>
                <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
              </div>
              <div>{result}</div>
              <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;