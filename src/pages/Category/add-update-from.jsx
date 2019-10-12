import React from 'react'
import { Form,Input } from 'antd'
import Proptypes from 'prop-types'
const Item =Form.Item
class AddUpdateFrom extends React.Component{
    static propTypes={
        setForm:Proptypes.func.isRequired,
        cname:Proptypes.string
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        const {cname}=this.props
        const { getFieldDecorator } = this.props.form
        return <div><Form>
            <Item>
            {getFieldDecorator('name',{
                initialValue:cname||'',
                rules:[{required: true, message: '分类名是必须的' }]
            })(
                <Input placeholder='请输入分类'>
                </Input>
            )}
            </Item>
            </Form></div>
    }
}
export default Form.create()(AddUpdateFrom)