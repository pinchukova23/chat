import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "../styles/Chat.module.css";
import Message from './Message';
import { LogOut } from 'lucide-react';
import { MessageData, SearchParams } from './types';


const socket = io("http://localhost:4000");

const Chat = () => {
  const location = useLocation();
  const [params, setParams] = useState<SearchParams>({name: '', room: ''});
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [message, setMessage] = useState<string>("");

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



  const handeleChange = () => {

  }

const handeleSubmit = () => {

}

const handeleLogOut = () => {

}

  return (
    <div className={styles.container} >
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.user}>
        <img className={styles.photo} src='./images/user.jpg' alt=''></img>
        <span className={styles.name}> {params.name} </span>
        </div>
        <div>
       <LogOut onClick={handeleLogOut} className={styles.logout} />
        </div>
      </div>

      <div className={styles.messages}>
        <Message messages={messages} name={params.name}/>

      </div>

      <form className={styles.form} onSubmit={handeleSubmit}>
      <input
      className={styles.input}
      type="text"
      name='message'
      value={message}
      placeholder='Write something..'
      onChange={handeleChange}
      />
        <button onSubmit={handeleSubmit} className={styles.button}>sent</button>
      </form>

    </div>

  </div>
  )
}

export default Chat
