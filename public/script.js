
const socket = io()
let names;
const textarea=document.querySelector('#textarea')
const messagearea=document.querySelector('.message__area')

do{
    names=prompt("Please enter your name:");

}while(!names)

textarea.addEventListener('keyup',(e)=>{
    if(e.key ==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:names,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value='';
    scrollToBottom();
    socket.emit('message',msg)


}
function appendMessage(msg,type){
    let mainDiv= document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')
    let markup =`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup;
    messagearea.appendChild(mainDiv)


}



socket.on('message',(msg)=>{
    appendMessage(msg,"incoming")
    scrollToBottom()
})

function scrollToBottom(){
    messagearea.scrollTop=messagearea.scrollHeight
}
