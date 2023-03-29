import { Map } from 'immutable'
import * as actionTypes from './actionTypes'
var curState = JSON.parse(sessionStorage.getItem('loginState'))
console.log(curState)

const defaultState = Map({
  isVisible: false,
  isLogin: false, // 登录状态
  profile: '',
  token: '',
  cookie: '',
})

if (curState){
  var loginState = Map({
    isVisible: false,
    isLogin: curState['islogin'], // 登录状态
    profile: curState['profile'],
    token: '',
    cookie: curState['cookie'],
  })
}

function reducer(state = curState ? loginState :defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_IS_VISIBLE_STATE:
      return state.set('isVisible', action.isVisible)
    case actionTypes.CHANGE_USER_LOGIN_STATE:
      return state.set('isLogin', action.isLogin)
    case actionTypes.CHANGE_PROFILE_INFO:
      return state.set('profile', action.profile)
    case actionTypes.CHANGE_PROFILE_TOKEN:
      return state.set('token', action.token)
    case actionTypes.CHANGE_PROFILE_COOKIE:
      return state.set('cookie', action.cookie)
    default:
      return state
  }
}

export default reducer
