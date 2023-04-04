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
