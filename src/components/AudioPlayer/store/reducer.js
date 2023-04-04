import { Map } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = Map({
    playList: [],
    playIndex: 0
})

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_PLAYLIST:
            return state.set('playList', action.playList)
        case actionTypes.CHANGE_PLAYINDEX:
            return state.set('playIndex', action.playIndex)
        // case actionTypes.CHANGE_PROFILE_INFO:
        //     return state.set('profile', action.profile)
        // case actionTypes.CHANGE_PROFILE_TOKEN:
        //     return state.set('token', action.token)
        // case actionTypes.CHANGE_PROFILE_COOKIE:
        //     return state.set('cookie', action.cookie)
        default:
            return state
    }
}

export default reducer
