import request from './request'

/* 获取歌单详情 */
export function playlistDetail(id) {
    return request({
        url: '/playlist/detail',
        method: 'get',
        params: {
            id
        },
    })
}
//获取歌单所有歌曲
export function playlistAllSongs(id,limit,offset) {
    return request({
        url: '/playlist/track/all',
        method: 'get',
        params: {
            id,
            limit,
            offset
        },
    })
}

export function getSongsDetail(ids) {
    return request({
        url: 'song/detail',
        method: 'get',
        params: {
            ids
        },
    })
}
//获得音乐URL
export function getSongUrl(id,level) {
    return request({
        url: '/song/url/v1',
        method: 'get',
        params: {
            id,
            level
        },
    })
}
