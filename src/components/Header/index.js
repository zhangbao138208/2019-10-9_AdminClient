import React, {Component} from 'react'
import './index.less'
import  storageUtils from '../../utils/storageUtils'
import { Modal } from 'antd'
import {withRouter} from 'react-router-dom'
import menulist from '../../config/menulistconfig'
import {formatDate} from '../../utils/dateFormatUtils'
import {reqWeather} from '../../api/index'
import LinkButton from '../../components/link-button'
const { confirm } = Modal
 class Header extends Component{
     state={
         currentTime:Date.now(),
         dayPictureUrl:'',
         weather:''
     }
    logout=()=>{
        Modal.confirm({
            title: '确认退出吗?',
            onOk:()=> {
              storageUtils.removeUser()
              this.props.history.replace('/login')
            },
            onCancel() {},
            okText: '确认',
    cancelText: '取消',
          })
    }
    getWeather= async()=>{
        const {dayPictureUrl,weather} =await reqWeather('上海')
        this.setState({dayPictureUrl,weather})

      }
    getTitle=(menulist)=>{
        var title =''
       const path=this.props.location.pathname
        menulist.some(m=>{
            if (m.key==path) {
               title=m.title
                return true
            }
            if (m.children) {
                title=this.getTitle(m.children)
                if (title!='') {
                    return true
                }
            }
        })
        return title
    }
    componentDidMount(){
        this.intervalId=setInterval(()=>{
            this.setState({currentTime:Date.now()})
        },1000);
       this.getWeather()
    }
    componentWillMount(){
        clearInterval(this.intervalId)
    }
render(){
    const {currentTime,dayPictureUrl,weather} =this.state
    const user=storageUtils.getUser()
    const title =this.getTitle(menulist)
    return <div className="header">
        <div className="header-top">
            欢迎，{user.username}&nbsp;&nbsp;<LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-buttom">
           <div className="header-buttom-left">{title}</div>
           <div className="header-buttom-right">
               <span>{formatDate(currentTime)}</span>
               <img src={dayPictureUrl}>
               </img>
               <span>{weather}</span>
           </div>
        </div>
    </div>
   
} 
}
export default withRouter(Header)