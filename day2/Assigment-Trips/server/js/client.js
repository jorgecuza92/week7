
const chatMessageTextBox = document.getElementById("chatMessageTextBox")
const usernameTextBox = document.getElementById("usernameTextBox")
const sendButton = document.getElementById("sendButton")
const messagesUL = document.getElementById("messagesUL")

sendButton.addEventListener('click', () => {

    const username = usernameTextBox.value 
    const chatMessage = chatMessageTextBox.value 
   

    // send an object to the server 
    socket.emit('Houston', {username: username, message: chatMessage})
})



// Username and chat message 
socket.on('Houston', (chat) => {
    const messageItem = `<li>${chat.username}: ${chat.message}</li>`
    messagesUL.insertAdjacentHTML('beforeend', messageItem)
})