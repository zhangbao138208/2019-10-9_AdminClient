export  function formatDate(time){
   if (!time) {
       return ''
   }
   let date=new Date(time)
   return date.getFullYear()+"-"+(parseInt( date.getMonth())+1).toString().toString().padStart(2,'0')+"-"+date.getDate().toString().padStart(2,'0')+" "+date.getHours().toString().padStart(2,'0')+":"+date.getMinutes().toString().padStart(2,'0')+":"+date.getSeconds().toString().padStart(2,'0')
}