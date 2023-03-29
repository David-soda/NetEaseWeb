import request from './request'

// 获取用户歌单，收藏，mv, dj 数量
export const getUserSubcount = (cookie) => {
    return request({
        url: '/user/subcount',
        params: {
            cookie
        }
    })
}

//登录状态
export const getUserStatus = (cookie) => {
    return request({
        url: '/login/status',
        params: {
            cookie
        }
    })
}

//获取账号信息
export const getUserInfo = (cookie) => {
    return request({
        url: '/user/account',
        params: {
            cookie
        }
    })
}
