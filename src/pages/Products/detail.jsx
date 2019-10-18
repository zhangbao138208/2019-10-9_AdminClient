import React,{Component} from 'react'
import { Card,List,Icon } from 'antd'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import {Redirect} from 'react-router-dom'
const Item =List.Item
export default class Detail extends Component{
    render(){
        const product=memoryUtils.product
        if (!product|| !product.id) {
           return <Redirect to='/products'></Redirect>
        }
         const title=<span style={{fontSize:20}}>
        <LinkButton onClick={()=>{this.props.history.goBack()}}><Icon type='arrow-left'/></LinkButton>
        <span>
        商品详情
        </span>
        </span>
        return <div className='detail'>
             <Card title={title} bordered={false} >
             <List>
                 <Item>
                     <span className='detail-left'>商品名称:</span>{product.name}
                 </Item>
                 <Item>
                 <span className='detail-left'>商品描述:</span>{product.description}
                 </Item>
                 <Item>
                 <span className='detail-left'>商品价格:</span>{product.price}
                 </Item>
                 <Item>
                 <span className='detail-left'>商品分类:</span>dgdfgdf
                 </Item>
                 <Item>
                 <span className='detail-left'>商品图片:</span>
                 <span className='detail-img'>
                     <img></img>
                     <img></img>
                     <img></img>
                 </span>
                 </Item>
                 <Item>
                 <span className='detail-left'>商品详情:</span>
                 <div dangerouslySetInnerHTML={{__html:product.detail}}></div>
                 </Item>
             </List>
             </Card>
        </div>
    }
}