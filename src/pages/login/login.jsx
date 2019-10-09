import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
import icon from './img/login-icon.jpg'
const Item = Form.Item;
export default class Login extends Component {
    handleSubmit = e => {
        //阻止事件的默認行為：表單的提交
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        return <div className="login">
            <div className="login-header">
                <img src={icon} alt={icon} />
                <h1>后台管理系统</h1>
            </div>
            <div className="login-container">
                <h1>用户登录</h1>
               <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Item >
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"/>
                        </Item>
                        <Item >
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password" placeholder="密码"/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 錄</Button>
                        </Item>
                    </Form>
             </div>
        </div>
    }
}
