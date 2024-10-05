
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const chat =React.createContext()
const ChatProvider = ({children}) => {
    const [selectedChat,setSelectedChat]=useState('')
    const [user,setUser] = useState()
    const [notification,setNotification]=useState()
    const [chats,setChats]=useState([])

    const navigate=useNavigate()
    useEffect(()=>{
      if(localStorage.getItem("userInfo")!=null){
        const userInfo =JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
      }
      else navigate('/')
    },[localStorage.getItem("userInfo")])
  return (
    <chat.Provider value={{selectedChat,setSelectedChat,user,setUser,notification,setNotification,chats,setChats}}>
        {children}  </chat.Provider>
  )
}
export default ChatProvider
export const chatState = ()=>useContext(chat)
