const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users')
const socket = io.connect('http://localhost:8000');

const {username,room}= Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log('user + room',username,room);
socket.emit('joinRoom',{username,room})

socket.on('roomUsers',({room,users})=> {
    outPutRoom(room);
    outPutUsers(users)
})

//message from the server
socket.on('message',message=> {
    console.log('this is the message',message)
    outputMessage(message) 
    
    //scroll down once a new message is received
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

//message submit
chatForm.addEventListener('submit', e=> {
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage',msg);

    //delete input after clickin submit
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//output message to the user
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">  ${message.text} </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

function outPutUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}


function outPutRoom(room) {
    roomName.innerHTML = room
}