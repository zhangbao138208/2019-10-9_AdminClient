import React, { Component } from 'react'
import './index.less'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../assets/images/login-icon.jpg'
import menulist from '../../config/menulistconfig.js'
import { Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { setHeaderTitle } from '../../redux/actions'
const { SubMenu } = Menu

class LeftNav extends Component {

  getMenuNodes2 = (menulist) => {
    return menulist.reduce((pre, item) => {

      if (!item.children) {
        pre.push(<Menu.Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Menu.Item>)
      } else {
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
    }, [])
  }
  hasAuth = (item) => {
    const user = this.props.user
    const roles = user.roles
    if (user.userName === 'admin') {
      return true
    }
    if (roles.indexOf(item.key) !== -1) {
      return true
    } else {
      if (item.children) {
        var citem = item.children.find(c => roles.indexOf(c.key) !== -1)
        return !!citem
      }
    }
    return false
  }
  getMenuNodes = (menulist) => {
    const path = this.props.location.pathname
    return menulist.map(item => {
      if (!this.hasAuth(item)) {
        return false
      }
      if (!item.children) {
        //初始化菜单时设置状态
        if (item.key === path || path.indexOf(item.key) === 0) {
          this.props.setHeaderTitle(item.title)
        }
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key} onClick={() => { this.props.setHeaderTitle(item.title) }}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        const citem = item.children.find(c => c.key === path)
        if (citem) {
          this.openkey = item.key
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
  componentWillMount() {
    this.menunodes = this.getMenuNodes(menulist)
  }
  render() {

    console.log(this.openkey)
    const selectkey = this.props.location.pathname
    return <div className="left-nav"><Link className='left-nav-link' to='/home'>
      <img src={logo} />
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

      </Menu>
    </div>
  }
}
export default connect(state => ({ user: state.user }), {
  setHeaderTitle
})(withRouter(LeftNav))