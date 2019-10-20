import React, { Component } from 'react'
import { Form, Icon, Input, Button, message, Spin } from 'antd';
import './login.less'
import icon from '../../assets/images/login-icon.jpg'
import { Redirect } from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'
import { login } from '../../redux/actions'
import { connect } from 'react-redux'
const Item = Form.Item;
class Login extends Component {
    state = {
        loading: false
    }
    handleSubmit(e) {
        //阻止事件的默認行為：表單的提交
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.props.login(values.username, values.password)
            } else {
                message.error("校验失败")
            }
        });
        // const from =this.props.form;
        // const values=from.getFieldsValue()
        // console.log(values)

        //    console.log('Received values of form: ');
    };
    validatePwd = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback('密码必须输入！')
        } else if (value.length < 4) {
            callback('密码必须大于4位')
        } else if (value.length > 12) {
            callback('密码必须小于12位')
        } else if (!/^[A-Za-z0-9_]+$/.test(value)) {
            callback('密码必须是数字、英文、下划线')
        } else {
            callback()
        }
    }
    render() {
        //如果user已经登陆跳转到管理页面
        var user = this.props.user
        if (user.id) {
            storageUtils.removeUser()
            storageUtils.savaUser(user)
            return <Redirect to="/"></Redirect>

        }
        const errorMsg = user.errorMsg
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return <div className="login">
            <div className="login-header">
                <img src={icon} alt={icon} />
                <h1>后台管理系统</h1>
            </div>
            <div className="login-container">
                {errorMsg ? <div className="login-errorMsg">{errorMsg}</div> : null}
                <h1>用户登录</h1>
                <Spin tip="登录中..." spinning={this.state.loading}>
                    <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                        <Item >
                            {getFieldDecorator('username', {
                                initialValue: '',
                                rules: [{ required: true, whitespace: true, message: '用户名时必须的！' },
                                { min: 4, message: '用户名不那能小于4位' },
                                { max: 12, message: '用户名不那能大于12位' },
                                { pattern: /^[A-Za-z0-9_]+$/, message: '用户名是数字、英文、下划线' }
                                ],
                            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名" />)}
                        </Item>
                        <Item >
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [{ validator: this.validatePwd }]
                                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password" placeholder="密码" />)
                            }

                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 录</Button>
                        </Item>
                    </Form>
                </Spin>
            </div>
        </div>
    }
}

const WrapperFrom = Form.create()(Login)
export default connect(state => ({ user: state.user }), { login })(WrapperFrom)
