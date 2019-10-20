import { SET_HEADER_TITLE,SHOW_ERROR,RECEIVE_USER,LOGOUT } from './actionType'
import { reqLogin } from '../api/index'
import storageUtils from '../utils/storageUtils'
export const setHeaderTitle=(headerTitle)=>({type:SET_HEADER_TITLE,data:headerTitle})
export const showError=(errorMsg)=>({type:SHOW_ERROR,errorMsg})
export const receiveUser=(user)=>({type:RECEIVE_USER,user})
export const logout=()=>{
  storageUtils.removeUser()
  return {type:LOGOUT}
}
export function login(username,password) {
    return async dispatch=>{
         const result =await reqLogin(username,password)
         if (result.status===0) {
           const a= receiveUser(result.data)
           dispatch(a)
         }else{
             dispatch(showError(result.data.msg))
         }
}
}