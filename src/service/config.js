// 本地测试API
// const devBaseURL = "http://localhost:3000";
// const proBaseURL = "http://localho st:3000";
// 已经部署到服务器上的API
const devBaseURL = "http://47.103.48.227:3000";
const proBaseURL = "http://47.103.48.227:3000";
// const devBaseURL = "http://123.207.32.32:9001/";
// const proBaseURL = "http://123.207.32.32:9001/";
export const BASE_URL =
    process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 8000
