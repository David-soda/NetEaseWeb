import {
    increment,
    decrement
} from '../../redux/actions/count'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

import React, {Component} from 'react'

class About extends Component {
    state = {carName:'奔驰c63'}

    //加法
    increment = ()=>{
        const {value} = this.selectNumber
        this.props.increment(value*1)
    }
    //减法
    decrement = ()=>{
        const {value} = this.selectNumber
        this.props.decrement(value*1)
    }
    //奇数再加
    incrementIfOdd = ()=>{
        const {value} = this.selectNumber
        if(this.props.count % 2 !== 0){
            this.props.increment(value*1)
        }
    }
    render() {
        return (
            <div>
                <h4>当前求和为：{this.props.count}</h4>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
            </div>
        );
    }
}

export default connect(
    state => ({
        count:state.count
    }),
    {increment,decrement}
)(About)
