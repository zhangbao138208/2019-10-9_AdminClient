import React, { Component } from 'react'
import { Card, Button, Table, Icon, message, Spin, Modal } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api/index'
import AddUpdateForm from './add-update-from'
import { reqAddCategory, reqUpdateCategory } from '../../api/index'
export default class Category extends Component {
  state = {
    data: [],
    loading: false,
    showStatus: 0,
  }
  getData = async () => {

    this.setState({ loading: true })
    const result = await reqCategorys()
    this.setState({ loading: false })

    if (result.status === 0) {
      this.setState({ data: result.data })
    }
    else {
      message.error('获取分类列表失败')
    }
  }
  handleOk = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.form.resetFields()
        const { showStatus } = this.state
        const { name } = values
        debugger
        let result

        if (showStatus === 1) {
          result = await reqAddCategory(name)
        } else {
          result = await reqUpdateCategory({ id: this.category.id, name })
        }

        if (result.status === 0) {
          this.setState({ showStatus: 0 })
          message.success(showStatus === 1 ? '添加成功' : '修改成功')
          this.getData()
        } else if (result.status === 2) {
          message.warn(result.msg)
        }
        else {
          this.setState({ showStatus: 0 })
          message.error(showStatus === 1 ? '添加失败了' : '修改失败')
        }
      }
    })
  }
  handleCancel = () => {
    this.form.resetFields()
    this.setState({ showStatus: 0 })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillMount() {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',

      },
      {
        title: '操作',
        width: 300,
        render: (category) => <LinkButton onClick={() => { this.setState({ showStatus: 2 }); this.category = category }}>修改分类</LinkButton>
      },
    ]
  }
  render() {
    const category = this.category || {}
    const { data, showStatus } = this.state
    const cbutton = <Button type='primary' onClick={() => { this.category = {}; this.setState({ showStatus: 1 }) }}><Icon type='plus'></Icon>添加</Button>
    return <div className="category">
      <Card extra={cbutton}>、
    <Spin tip="加载..." spinning={this.state.loading}>
          <Table
            rowKey='id'
            columns={this.columns}
            dataSource={data}
            bordered
            pagination={{ defaultPageSize: 7, showQuickJumper: true }}
          />
        </Spin>
      </Card>
      <Modal
        title={showStatus === 1 ? '添加分类' : '修改分类'}
        visible={showStatus !== 0}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText='确认'
        cancelText='取消'
      >
        <AddUpdateForm setForm={form => this.form = form} cname={category.name} />
      </Modal>

    </div>
  }
}