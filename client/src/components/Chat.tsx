import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { useLocation, useNavigate } from 'react-router-dom';
import Message from './Message';

const socket = io("http://localhost:4000");

type SearchParams = {
  name: string;
  room: string;
}
type MessageData = {
  content: string;
};

const Chat = () => {
  const location = useLocation();
  const [params, setParams] = useState<SearchParams>({name: '', room: ''});
  const [messages, setMessages] = useState<MessageData[]>([]);


  useEffect( () => {
    const searchParams = Object.fromEntries(new URLSearchParams(location.search)) as SearchParams;
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [location.search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setMessages((prevState) => [...prevState, data]);
    console.log(data)
    })
  }, []);

  return (
    <div>
      chat
    </div>
  )
}

export default Chat
