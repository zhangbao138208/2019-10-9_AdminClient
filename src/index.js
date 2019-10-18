import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './api'
// function btnClick() {
//     //创建核心对象
//    let  xmlhttp = null;
//     if (window.XMLHttpRequest) {// code for Firefox, Opera, IE7, etc.
//         xmlhttp = new XMLHttpRequest();
        
//     } else if (window.ActiveXObject) {// code for IE6, IE5
//       //  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     //编写回调函数
//     xmlhttp.onreadystatechange = function() {
        
//         /* 	alert(xmlhttp.readyState); */
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//            // let s=  xmlhttp.getGeneral()
//             var h=xmlhttp.getAllResponseHeaders()
//             debugger
//             alert(xmlhttp.responseText)
//         }
//         /* alert(123); */
//     }
//     //open设置请求方式和请求路径
//     xmlhttp.open("post", "http://api.168cp.com/third/game/GetGameMenu");//一个servlet，后面还可以写是否同步
//     //设置请求头
//     xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded")
//     //send 发送
//     xmlhttp.send("username=张三");
// }

ReactDOM.render(<App/>,document.getElementById('root'))