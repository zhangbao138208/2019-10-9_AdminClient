import React,{Component} from 'react'
// eslint-disable-next-line 
import {BrowserRouter,HashRouter,Route,Switch} from 'react-router-dom'
import Admin from './pages/admin/admin.jsx'
import Login from './pages/login/login.jsx'
export default class App extends Component{
     render(){
        return <BrowserRouter>
            <Switch>
             <Route path="/login" component={Login}/>
             <Route path="/" component={Admin}/>
            </Switch>
        </BrowserRouter>
    }
}