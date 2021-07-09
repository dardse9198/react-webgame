import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        count : 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [],  // {a, 1}에서 setState {a: 1}을 할 때 새로 랜더링하므로 state에 객체 구조를 쓰지 않는 것이 좋음
    };

    // component에서 사용, pureComponent는 자동으로 해줌
    // shouldComponentUpdate(nextProps, nextState, nextContext) {  // 어떤 경우에 랜더링을 다시 할지 직접 적어줌
    //     if(this.state.counter != nextState.counter) {  // 현재의 카운터와 미래의 카운터가 다르면 랜더링
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        this.setState({
            array: [...this.state.array, 1],  // 새로운 배열 : 기존 배열 펼치고 새로운 값 넣음.
        });
    };

    render() {
        console.log('랜더링', this.state);  // 버튼 클릭했을 때 랜더링됨
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}