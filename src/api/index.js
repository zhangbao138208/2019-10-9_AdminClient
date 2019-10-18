import ajax from './ajax.js'
import axios from './ajax.js'
import jsonp from 'jsonp'
import {message} from 'antd'
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
export const reqWeather=(city)=>{
    const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve,reject)=>{
        jsonp(url,{},(error,data)=>{
           if (!error&&data.error===0) {
                const {dayPictureUrl,weather}=  data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
              }else{
                  message.error('获取天气信息失败')
              }
        })
    })
}
export const reqCategorys=()=>ajax(baseURL+'/api/manage/category')
export const reqAddCategory=(name)=>ajax.post(baseURL+'/api/manage/AddCategory',{name})
export const reqUpdateCategory=({id,name})=>ajax.post(baseURL+'/api/manage/UpdateCategory',{id,name})
export const reqProductsUpdateStatus=({productId,status})=>ajax.post(baseURL+'/api/manage/ProductsUpdateStatus',{productId,status})

export const reqProducts=({pageNum,pageSize,searchType,searchName})=>ajax(baseURL+'/api/manage/Products',{params:{pageNum,pageSize,searchType,searchName}})
export const reqRoles=()=>ajax(baseURL+'/api/Roles/getRoles')
export const reqUpdateRoles=(roles)=>ajax.post(baseURL+'/api/Roles/updateRoles',roles)

