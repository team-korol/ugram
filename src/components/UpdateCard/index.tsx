import React from 'react';
import style from './index.module.css';

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  buttonText: string;
};

const UpdateCard: React.FC<Props> = ({ onClick, text, buttonText }) => {
  return (
    <div className={style.card}>
      <div className={style.wrapper}>
        <p className={style.text}>{text}</p>
        <button className={style.button} onClick={onClick} tabIndex={0}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default UpdateCard;
