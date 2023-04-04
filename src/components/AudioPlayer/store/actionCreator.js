import * as actionTypes from './actionTypes'


export const changePlayList = (playList) => ({
    type: actionTypes.CHANGE_PLAYLIST,
    playList: playList
})

export const changePlayIndex = (playIndex) => ({
    type: actionTypes.CHANGE_PLAYINDEX,
    playIndex: playIndex
})

