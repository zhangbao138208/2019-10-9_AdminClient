import storageUtils from '../utils/storageUtils'
import { combineReducers } from 'redux'
import { SET_HEADER_TITLE, SHOW_ERROR, RECEIVE_USER,LOGOUT } from './actionType'
const title = '首页'
function headerTitle(state = title, action) {
    console.log('headerTitle')
    switch (action.type) {
        case SET_HEADER_TITLE:
            console.log('headerTitle11')
            return action.data
        default:
            return state
    }
}
const initUser = storageUtils.getUser()
function user(state = initUser, action) {
    console.log('user')
    switch (action.type) {
        case LOGOUT:
            return {}
        case SHOW_ERROR:
            return { ...state, errorMsg: action.errorMsg }
         case RECEIVE_USER:
            return action.user
         default:
            return state
    }
}
const reducer = combineReducers({
    headerTitle,
    user
})
export default reducer