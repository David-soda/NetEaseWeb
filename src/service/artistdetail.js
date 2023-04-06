import request from './request'

//获取 艺人 信息
export function getArtistDetail(id) {
    return request({
        url: "/artist/detail",
        params: {
            id
        }
    })
}

// 获取 歌手单曲
export function getArtistHotSongs(id) {
    return request({
        url: "/artists",
        params: {
            id
        }
    })
}
//获取歌手 mv
export function getArtistMv(id) {
    return request({
        url: "/artist/mv",
        params: {
            id
        }
    })
}
//获取mv地址
export function getMvUrl(id,r) {
    return request({
        url: "/mv/url",
        params: {
            id,
            r
        }
    })
}
//获取相似歌手
export function getSimiArtists(id) {
    return request({
        url: "/simi/artist",
        params: {
            id
        }
    })
}

