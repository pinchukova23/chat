import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../styles/Main.module.css";
import { InputValue } from './types';


const initialState: InputValue = {
  name: "",
  room: "",
};

const Main = () => {
  const[values, setValues] = React.useState<InputValue>(initialState);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
console.log(values)

  const handelClick = (e:React.MouseEvent<HTMLAnchorElement>) => {
    const { name, room } = values;
    if (!name || !room) {
      e.preventDefault();
    };
  };

  return (
    <div>
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
        <form className={styles.form}>
            <div className={styles.group}>
              <input
              type="text"
              name='name'
              value={values.name}
              placeholder='Username'
              className={styles.input}
              onChange={handelChange}
              />
            </div>
            <div className={styles.group}>
              <input
              type="text"
              name='room'
              value={values.room}
              placeholder='Room'
              className={styles.input}
              onChange={handelChange}
              />
            </div>
            <Link
            to={`/chat?name=${values.name}&room=${values.room}`}
            onClick={handelClick}>
              <button type='submit' className={styles.button}>
                Sign in
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Main

