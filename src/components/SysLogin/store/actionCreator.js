import { gotoPhoneLogin, qrStatusCheck, userLogout } from '../../../service/login'
import { getUserInfo,getUserStatus } from  '../../../service/user'
import loginInfo from '../../../config/token'
import * as actionTypes from './actionTypes'
import { message } from 'antd'
import {useSelector} from "react-redux";

// 更改登录框显示
export const changeIsVisible = (visibleState) => ({
    type: actionTypes.CHANGE_IS_VISIBLE_STATE,
    isVisible: visibleState
})

// 更改登录用户信息
export const changeUserProfile = (profileInfo) => ({
    type: actionTypes.CHANGE_PROFILE_INFO,
    profile: profileInfo
})

// 更改登录状态
export const changeUserLoginState = (loginState) => ({
    type: actionTypes.CHANGE_USER_LOGIN_STATE,
    isLogin: loginState
})

// 更改登录状态(token)
export const changeUserLoginToken = (token) => ({
    type: actionTypes.CHANGE_PROFILE_TOKEN,
    token
})


// 更改登录状态(cookie)
export const changeUserLoginCookie = (cookie) => ({
    type: actionTypes.CHANGE_PROFILE_COOKIE,
    cookie
})


export const getLoginProfileInfo = (phone, code) => {
    return (dispatch) => {
        gotoPhoneLogin(phone, code).then((res) => {
            if (res.code !== 200) {
                message.error('手机号或验证码错误')
            }else {
                message.success('登录成功')
                // 登录成功
                console.log('cookie',res.data.cookie)
                document.cookie = res.cookie
                // 保存登录信息
                dispatch(changeUserProfile(res && res.profile))
                // 更改登录状态
                dispatch(changeUserLoginState(true))
                dispatch(changeUserLoginToken(res.token))
                dispatch(changeUserLoginCookie(res.cookie))
                console.log(res)
                // 更改登录状态
                getUserInfo().then(res=>{
                    console.log(res)
                })
            }
        })
    }
}
//二维码登录
export const getLoginProfileInfoQr = (key) => {
    return (dispatch) => {
        let count = 0
        const timer = setInterval(async ()=>{
            count++
            let res = await qrStatusCheck(key)
            if (res.code == 803) {
                clearInterval(timer)
                message.success('登录成功！')
                //用户cookie
                dispatch(changeUserLoginCookie(res.cookie))
                // 更改登录状态
                dispatch(changeUserLoginState(true))
                let resInfo = await getUserInfo(res.cookie)
                // 保存登录信息
                dispatch(changeUserProfile(resInfo.profile))
                let loginState = JSON.stringify({
                    'islogin': true,
                    'cookie': res.cookie,
                    'profile': resInfo.profile
                })
                sessionStorage.setItem('loginState', loginState)
            }
            if(count === 5){
                clearInterval(timer)
                message.error('验证码已过期！')
            }
        },5000)
    }
}
export const userInfoLogout = () => {
    return(dispatch) => {
        dispatch(changeUserLoginState(false))
        userLogout().then(res=>{
            console.log(res)
        })
    }
}

