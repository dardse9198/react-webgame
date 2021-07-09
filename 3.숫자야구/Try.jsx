import React, { PureComponent, ㅡ드ㅐ } from 'react';

class Try extends PureComponent {  // purecomponent : props, state가 바뀌었는지 알 수 있음
    constructor(props) {  // 함수 : 정밀한 동작, 기본 객체로는 안되는 동작이 있을 때 사용
        // 다른 동작
        const filtered = this.props.filtered(() => {

        });
        super();
        this.state = {
            result: this.props.result,
            try: this.props.try,
        }
    }
    render() {
        const { tryInfo } = this.props;
        return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
        );
    }
}
// const Try = memo({ tryInfo }) => {  // hooks에서는 memo로 purecomponent와 같은 역할
//     // tryInfo.try = 'hello'  // 불가능. props는 부모가 바꿔야함
//     const [result, setResult] = useState(tryInfo.result);

//     const onClick = () => {
 //       setResult('1');
//      };
//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//             <div onClick={onClick}>{result}</div>
//         </li>
//     )
// });

export default Try;