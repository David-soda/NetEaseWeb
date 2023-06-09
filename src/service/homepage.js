import request from './request'

//获取 APP 首页信息
export function getAppInfo() {
    return request({
        url: "/homepage/block/page"
    })
}

//获取 Banner
export function getBanners(type) {
    return request({
        url: "/banner",
        params: {
            type
        }
    })
}
//获取推荐歌单
export function getRecPlaylist(cat,limit,before) {
    return request({
        url: "/top/playlist/highquality",
        params: {
            cat,
            limit,  //取出歌单数量 , 默认为 50
            before, //分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
        }
    })
}

//获取排行榜
export function getToplist() {
    return request({
        url: "/toplist",
    })
}

// 获取搜索建议
// 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息
export function getSuggestKeywords(keywords) {
    return request({
        url: '/search/suggest',
        params:{
            keywords
        }
    })
}
