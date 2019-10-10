import ajax from './ajax.js'
// const baseURL='https://localhost:44332/api'
const baseURL=''

export function reqLogin(username,passward){
    ajax({
        method:'get',
        url:baseURL+'/api/login',
        data:{username,passward}
    })
}
const name='admin'
const pwd='admin'
reqLogin(name,pwd)