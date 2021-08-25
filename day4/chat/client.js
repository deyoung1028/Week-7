const chatMessageTextBox = document.getElementById('chatMessageTextBox')
const sendMessageButton = document.getElementById('sendMessage')
const messagesUL = document.getElementById("messagesUL")

sendMessageButton.addEventListener('click', () => {

    const chatMessage = chatMessageTextBox.value 
    socket.emit('Houston', { message: chatMessage, username: 'johndoe'})

})

socket.on('Houston', (chat) => {
    //console.log(chatMessages)
    const messageItem = `<li>${chat.username}: ${chat.message}</li>`
    messagesUL.insertAdjacentHTML('beforeend', messageItem)
})

