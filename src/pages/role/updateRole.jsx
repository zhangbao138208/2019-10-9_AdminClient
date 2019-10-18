import React,{Component} from 'react'
import { Form,Tree,Input  } from 'antd'
import menuList from '../../config/menulistconfig'
const { TreeNode } = Tree
const Item =Form.Item
export default  class UpdateRoles extends Component{
    state={
      
        checkKeys:[]
    }
    
    setCheck=(value)=>{
          var c=value.roles?value.roles.split(','):[]
         this.setState({checkKeys:c})
        // this.checkKeys=c
    }
     getTreeNodes=(list)=>{
        return list.reduce((pre,item)=>{
            pre.push( <TreeNode title={item.title} key={item.key}>
                {item.children?this.getTreeNodes(item.children):null}
            </TreeNode>)
            return pre
        },[])
     }
     handleCheck=(checkKeys)=>{
         this.setState({
            checkKeys
         })
     }
     componentWillMount(){
         this.treeNodes= this.getTreeNodes(menuList)
         const {roles} =this.props
         this.setCheck(roles)
    }
    componentWillReceiveProps(nextProp){
         this.setCheck(nextProp.roles)
    }
    getMenu=()=>{
        return this.state.checkKeys
    }
    render(){
       const {roles} =this.props
      
     const formItemLayout = {
            labelCol: {
              span:4
            },
            wrapperCol: {
                span:15
            },
          }
        const {checkKeys} =this.state
        return <div>
            <Form>
            <Item label='角色名称' {...formItemLayout}>
               <Input disabled value={roles.name}></Input>
            </Item>
            <Item>
         <Tree
         checkable
         defaultExpandAll
        checkedKeys={checkKeys}
        onCheck={this.handleCheck}
    >
      <TreeNode title="平台权限" key="all">
        {this.treeNodes}
      </TreeNode>
    </Tree>
    </Item>
    </Form>
    </div>
    }
}