import React from 'react'
import ChatComponent from '../../ui/chart/Chat'
import Chat from '../../components/Chat.jsx'

function Message() {
  return (
    <div className='w-full h-full bg-background text-foreground border-border border rounded-lg'>
        <ChatComponent />
    </div>
  )
}


export default Message