import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_URL } from '../../constants';
import style from './index.module.css';
type Props = {
  onSignOutClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onCloseButtonClick: () => void;
};

const UserInfoCard: React.FC<Props> = ({
  onSignOutClick,
  onCloseButtonClick,
}) => {
  return (
    <div className={style.card}>
      <button className={style.button} onClick={onSignOutClick}>
        サインアウト
      </button>
      <Link
        className={style.button}
        to={PAGE_URL.PRIVACY_POLICY}
        onClick={onCloseButtonClick}
      >
        Privacy policy
      </Link>
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
