import React from 'react'
import ChatComponent from '../../components/Chat.jsx'
import Chat from '../../components/Chat.jsx'

function Message() {
  return (
    <div className='w-full h-full bg-background text-foreground border-border border rounded-lg'>
        <ChatComponent />
    </div>
  )
}


export default Message