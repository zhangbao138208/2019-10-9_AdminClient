import store from 'store'
const USRKET ='user_key'
export default{
    savaUser(user){
      //localStorage.setItem(USRKET,JSON.stringify(user))
      store.set(USRKET,user)
    },
    getUser(){
       // return JSON.parse( localStorage.getItem(USRKET)||'{}')
       return store.get(USRKET)||{}
    },
    removeUser(){
       // localStorage.removeItem(USRKET)
       store.remove(USRKET)
    }
}