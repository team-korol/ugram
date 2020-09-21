import classNames from 'classnames';
import React from 'react';
import style from './index.module.css';
type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const UserInfoCard: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={style.card}>
      <button className={style.button} onClick={onClick} tabIndex={0}>
        サインアウト
      </button>
      <a
        className={classNames([style.button], [style.youtube])}
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Youtube
      </a>
    </div>
  );
};

export default UserInfoCard;
