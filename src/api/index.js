import ajax from './ajax.js'
import axios from './ajax.js'
// const baseURL='https://localhost:44332/api'
const baseURL=''
// export const reqLogin =(username,passward)=>(
//     ajax({
//         method:'post',
//         url:baseURL+'/api/login/Post',
//         data:{username,passward}
//     })
// )
export const reqLogin =(username,password)=>ajax.post(baseURL+'/api/login/Post',{username,password})
