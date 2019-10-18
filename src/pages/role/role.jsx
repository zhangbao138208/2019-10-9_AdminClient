import React, {Component} from 'react'
import { Card,Button,Icon,Table,message,Modal,Tree  } from 'antd'
import {formatDate} from '../../utils/dateFormatUtils'
import LinkButton from '../../components/link-button'
import {reqRoles,reqUpdateRoles} from '../../api/index'
import UpdateRoles from "./updateRole";
import storageUtils from '../../utils/storageUtils'
export default class Role extends Component{
    state={
        modelShow:false,
        rolesList:[],
    }
    getRolesList=async()=>{
        const result=await reqRoles()
        if (result.status===0) {
            this.setState({rolesList:result.data})
        }else{
           message.error(result.msg)
        }
     }
    initalColumns=()=>{
        this.columns=[
            {
                title: '角色名称',
                dataIndex: 'name',
             },
             {
                title: '创建时间',
                dataIndex: 'createTime',
                render:formatDate
             },
             {
                title: '授权时间',
                dataIndex: 'authTime',
                render:formatDate
             },
             {
                title: '授权人',
                dataIndex: 'authorizer',
              },
              {
                title: '操作',
                render:(rows)=>{
                    const roles=rows.roles?rows.roles.split(","):[]
                    return <LinkButton onClick={()=>{
                       this.setState({modelShow:true})
                       this.roles=rows
                     }
                }>设置权限</LinkButton>
                }
              }
        ]
    }
    updaterole=async()=>{
        this.setState({modelShow:false})
        const checkList= this.refs.authUpdateRole.getMenu()
        this.roles.roles=checkList.join(',')
       this.roles.authorizer=storageUtils.getUser().username
        const result =await reqUpdateRoles(this.roles)
        if (result.status===0) {
            this.getRolesList()
            message.success('更新角色成功')
        }else{
            message.error(result.msg)
        }
    }
    hideModal= async()=>{
        this.setState({modelShow:false})
   }
    componentWillMount(){
        this.initalColumns()
      
    }
    componentDidMount(){
        this.getRolesList()
    }
    
render(){
    const {rolesList}=this.state
    const roles=this.roles
    const title=<Button type='primary'><Icon type='plus'></Icon>创建角色</Button>
    return <div className="role">
         <Card title={title} bordered={false} >
         <Table columns={this.columns} dataSource={rolesList} bordered rowKey='id'/>
    </Card>
      <Modal
        title="设置角色权限"
        visible={this.state.modelShow}
        onOk={this.updaterole}
        onCancel={this.hideModal}
        okText="确认"
        cancelText="取消"
      >
          <UpdateRoles roles={roles} ref='authUpdateRole'></UpdateRoles>
       </Modal>
    </div>
} 
}