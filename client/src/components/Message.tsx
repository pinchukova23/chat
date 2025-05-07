import React from 'react';
import { MessageProps } from './types';
import styles from "../styles/Message.module.css";

const Message: React.FunctionComponent<MessageProps> = ({ messages, name }) => {
  return (
    <div className={styles.messages}>
    {messages.map(({ user, message }, i) => {
      const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
      const className = itsMe ? styles.me : styles.user;
      const NameText = itsMe ? styles.text : styles.usertext;

      return (
        <div key={i} className={`${className}`}>
          <div className={styles.message}>
            <span className={styles.name}>{user.name}</span>
            <div className={`${styles.text} ${NameText}`}>{message}</div>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default Message
