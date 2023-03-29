import request from './request'
/* 手机号验证登录 */
export function gotoPhoneLogin(phone, captcha) {
  return request({
    url: '/captcha/verify',
    method: 'get',
    params: {
      phone,
      captcha,
    },
  })
}

// 发送验证码
export function sendRegisterCode(phone) {
  return request({
    url: '/captcha/sent',
    method: 'get',
    params: {
      phone,
    },
  })
}
// 二维码 key 生成接口
export function getQrKey() {
  return request({
    url: '/login/qr/key',
    method: 'get'
  })
}
// 二维码生成接口
export function getQrCreate(key) {
  return request({
    url: '/login/qr/create',
    method: 'get',
    params: {
      key
    }
  })
}


// 二维码检测扫码状态接口
export function qrStatusCheck(key) {
  return request({
    url: '/login/qr/check',
    method: 'get',
    params: {
      key
    }
  })
}

// 游客访问
export function visitUser() {
  return request({
    url: '/register/anonimous',
    method: 'get',
  })
}
//登出
export function userLogout(cookie) {
  return request({
    url: '/logout',
    method: 'get',
    params: {
      cookie
    }
  })
}




