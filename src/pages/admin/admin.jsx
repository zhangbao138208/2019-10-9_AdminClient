import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/Header'
import {Switch,Route} from 'react-router-dom'
import Home from '../Home/Home'
import Role from '../role/role'
import Products from '../Products/Products'
import User from '../user/user'
import Category from '../Category/Category'
import Bar from '../chats/bar'
import Line from '../chats/line'
import Pie from '../chats/pie'

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component{
  render(){
    var user=storageUtils.getUser()
    if (!user._id) {
        return <Redirect to="/login"></Redirect>
    }
      return  <div style={{height:'100%'}}>
 
       <Layout style={{height:'100%'}} >
      <Sider><LeftNav /></Sider>
      <Layout>
        <Header />
        <Content style={{background:'white'}}>
        <Switch>
          <Route path='/home' component={Home}></Route>
          <Route path='/role' component={Role}></Route>
          <Route path='/products' component={Products}></Route>
          <Route path='/user' component={User}></Route>
          <Route path='/category' component={Category}></Route>
          <Route path='/role' component={Role}></Route>
          <Route path='/line' component={Line}></Route>
          <Route path='/bar' component={Bar}></Route>
          <Route path='/pie' component={Pie}></Route>
          <Redirect to='/home'></Redirect>
        </Switch>
        </Content>
        <Footer style={{textAlign:'center',color:'rgba(0,0,0,0.3)'}}>推荐使用谷歌浏览器，可以获得更佳体验操作</Footer>
      </Layout>
    </Layout>
    </div>
  }
}