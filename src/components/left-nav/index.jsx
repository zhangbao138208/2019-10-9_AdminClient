import React, {Component} from 'react'
import './index.less'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../assets/images/login-icon.jpg'
import menulist from '../../config/menulistconfig.js'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

 class LeftNav extends Component{

    getMenuNodes2=(menulist)=>{
       return menulist.reduce((pre,item)=>{
             if (!item.children) {
                 pre.push( <Menu.Item key={item.key}>
                    <Link to={item.key}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                    </Link>
                    </Menu.Item>)
             }else{
                 pre.push(
                    <SubMenu
                    key={item.key}
                  title={
                  <span>
                  <Icon type={item.icon} />
                 <span>{item.title}</span>
               </span>
                }
                >
                    {this.getMenuNodes2(item.children)}
               </SubMenu>
                 )
             }
             return pre
       },[])
    }
    getMenuNodes=(menulist)=>{
       const path=this.props.location.pathname
      return  menulist.map(item=>{
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                   <Link to={item.key}>
                   <Icon type={item.icon} />
                   <span>{item.title}</span>
                   </Link>
                   </Menu.Item>
                )
            }else{
                const citem=item.children.find(c=>c.key==path)
                if (citem) {
                    this.openkey=item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                      title={
                      <span>
                      <Icon type={item.icon} />
                     <span>{item.title}</span>
                   </span>
                    }
                    >
                        {this.getMenuNodes(item.children)}
                   </SubMenu>
                )
            }
        })
    }
    componentWillMount(){
        this.menunodes=this.getMenuNodes(menulist)
    }
render(){
    
    console.log(this.openkey)
    const selectkey =this.props.location.pathname
    return <div className="left-nav"><Link className='left-nav-link' to='/home'>
        <img src={logo}/>
        <span>硅谷后台</span>
        </Link>
        <Menu
        selectedKeys={[selectkey]}
        defaultOpenKeys={[this.openkey]}
         mode="inline"
          theme="dark"
       >
           {
              this.menunodes
           }
          {/* <Menu.Item key="/home">
              <Link to='/home'>
              <Icon type="home" />
            <span>首页</span>
              </Link>
            </Menu.Item>
         <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品</span>
              </span>
            }
          >
             <Menu.Item key="/category">
              <Link to='/category'>
              <Icon type="home" />
            <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/products">
              <Link to='/products'>
              <Icon type="home" />
            <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
        </div>
} 
}
export default withRouter(LeftNav)