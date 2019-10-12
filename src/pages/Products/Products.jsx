import React, { Component } from 'react'
import { Card, Button, Icon, Input, Table, Select } from 'antd'
import LinkButton from '../../components/link-button'
const Option = Select.Option
export default class Products extends Component {
    state = {
        data: [{id:1,name:'nike',desc:'的是法第三方',price:1000,status:1}]
    }
    initalColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=>'￥'+price
            },
            {
                title: '状态',
                width:100,
                dataIndex: 'status',
                render:(status)=>{
                  let btext='下架'
                  let text='在售'
                  if (status===2) {
                      btext='上架'
                      text='已下架'
                  }
                    return <span>
                      <Button type='primary'>{btext}</Button>
                      <br></br>
                      <span>{text}</span>
                    </span>
                }
            },
            {
                title: '操作',
                width:80,
                render:()=><LinkButton>操作详情</LinkButton>
            }
        ]
    }
    componentWillMount() {
        this.initalColumns()
    }
    render() {
        const { data } = this.state
        const title = (<span>
            <Select style={{ width: 150 }} value='1'>
                <Option value='1'>按名称搜索</Option>
                <Option value='2'>按描述搜索</Option>
            </Select>
            <Input placeholder='关键字' style={{ width: 120, margin: '0 10px' }}></Input>
            <Button type='primary'>搜索</Button>
        </span>)
        const extra = (<Button type='primary'><Icon type='plus'></Icon>添加商品</Button>)
        return <div className="products">
            <Card title={title} extra={extra} >
                <Table
                    rowKey='id'
                    columns={this.columns}
                    dataSource={data}
                    bordered
                    pagination={{ defaultPageSize: 7, showQuickJumper: true }}
                />
            </Card>
        </div>
    }
}