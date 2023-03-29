//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'
//引入为Count组件服务的reducer
import count from './count'
import bread from "./bread";
import loginState from  '../../components/SysLogin/store/reducer'

//汇总所有的reducer变为一个总的reducer
export default combineReducers({
    count,
    bread,
    loginState
})
