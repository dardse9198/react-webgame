import React, {Component } from 'react';

class Try1 extends Component {
    render() {
        // 부모 component가 자식 component에게 props 물려줌(강제)
        // props 있음 -> 부모 있음
        return (
          <li>
            <b>{this.value.fruit}</b> - {this.props.index} 
            <div>컨텐츠</div>
            <div>컨텐츠1</div>
            <div>컨텐츠2</div>
            <div>컨텐츠3</div>
          </li>
        );
    }
}

export default Try1;