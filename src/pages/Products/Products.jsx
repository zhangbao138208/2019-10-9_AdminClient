import React, { Component } from 'react'
import { Card, Button, Icon, Input, Table, Select,message } from 'antd'
import LinkButton from '../../components/link-button'
import {reqProducts,reqProductsUpdateStatus} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
const Option = Select.Option
export default class Products extends Component {
    state = {
        data: [],
        total:0,
        pageSize:2,
        searchType:'1',//安名称搜索
        searchName:''
    }
    initalColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'description'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=>'￥'+price
            },
            {
                title: '状态',
                width:100,
                render:({status,id})=>{
                  let btext='下架'
                  let text='在售'
                  if (status===2) {
                      btext='上架'
                      text='已下架'
                  }
                    return <span>
                      <Button type='primary' onClick={()=>this.productUpdateStatus(id,status)}>{btext}</Button>
                      <br></br>
                      <span>{text}</span>
                    </span>
                }
            },
            {
                title: '操作',
                width:80,
                render:(product)=><div>
                <LinkButton onClick={()=>{
                    memoryUtils.product=product
                    this.props.history.push('/products/detail')
                    }}>详情</LinkButton>
                <LinkButton>修改</LinkButton></div>
            }
        ]
    }
    productUpdateStatus= async(id,status)=>{
      status= status===1?2:1
      const result =await reqProductsUpdateStatus({productId:id,status})
      if (result.status===0) {
          message.success('更新商品状态成功')
          this.getProducts(this.pageNum)
      }else{
          message.error(result.msg)
      }
    }
    getProducts= async(pageNum)=>{
        this.pageNum=pageNum
        const {pageSize,searchType,searchName}=this.state
      const result=await reqProducts({pageNum,pageSize,searchType,searchName})
      if (result.status===0) {
          this.setState({data:result.data,total:result.total})
      }
    }
    componentWillMount() {
        this.initalColumns()
    }
    componentDidMount(){
        this.getProducts(1)
    }
    render() {
        const { data ,pageSize,total,searchName,searchType} = this.state
        const title = (<span>
            <Select style={{ width: 150 }} value={searchType} onChange={(value)=>{this.setState({searchType:value})}}>
                <Option value='1'>按名称搜索</Option>
                <Option value='2'>按描述搜索</Option>
            </Select>
            <Input placeholder='关键字' style={{ width: 120, margin: '0 10px' }} value={searchName} onChange={(e)=>{this.setState({searchName:e.target.value})}}></Input>
            <Button type='primary' onClick={()=>{this.getProducts(1)}}>搜索</Button>
        </span>)
        const extra = (<Button type='primary'><Icon type='plus'></Icon>添加商品</Button>)
        return <div className="products">
            <Card title={title} extra={extra} >
                <Table
                    rowKey='id'
                    columns={this.columns}
                    dataSource={data}
                    bordered
                    pagination={{ defaultPageSize:pageSize , total,onChange:this.getProducts,showQuickJumper: true }}
                />
            </Card>
            
        </div>
    }
}