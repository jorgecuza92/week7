

const chatMessageTextBox = document.getElementById("chatMessageTextBox")
const usernameTextBox = document.getElementById("usernameTextBox")
const sendButton = document.getElementById("sendButton")
const messagesUL = document.getElementById("messagesUL")

sendButton.addEventListener('click', () => {

    const username = usernameTextBox.value 
    const chatMessage = chatMessageTextBox.value 
    // send a message to the server 
    //socket.emit('Houston', chatMessage)

    // send an object to the server 
    socket.emit('Houston', {username: username, message: chatMessage})
})

// client listening for messages from the server 
/*
socket.on('Houston', (message) => {
    const messageItem = `<li>${message}</li>`
    messagesUL.insertAdjacentHTML('beforeend', messageItem)
    console.log(message)
}) */

// Username and chat message 
socket.on('Houston', (chat) => {
    const messageItem = `<li>${chat.username}: ${chat.message}</li>`
    messagesUL.insertAdjacentHTML('beforeend', messageItem)
})