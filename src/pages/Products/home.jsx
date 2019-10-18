import React,{Component} from 'react'
import Products from './Products'
import Detail from './detail'
import {Switch,Route,Redirect} from 'react-router-dom'
import {} from './product.less'
export default  class Home extends Component{
    render(){
       return <Switch>
           <Route path='/products' exact component={Products}></Route>
           <Route path='/products/detail' component={Detail}></Route>
           <Redirect to='/products'></Redirect>
       </Switch>
    }
}