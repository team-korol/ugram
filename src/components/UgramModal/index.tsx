import React, { useCallback } from 'react';
import style from './index.module.css';
import classNames from 'classnames';

type Props = {
  className?: string;
  children: React.ReactNode;
  isShow: boolean;
  onCloseButtonHandler?: (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const UgramModal: React.FC<Props> = ({
  className,
  children,
  isShow,
  onCloseButtonHandler
}: Props) => {
  const handleClick = useCallback(e => {
    if(e.target !== e.currentTarget){
      return;
    }
    onCloseButtonHandler && onCloseButtonHandler(e);
  },[onCloseButtonHandler]);
  return (
    <>
      {isShow && (
        <div
          className={classNames([style.modal], {className})}
          onClick={handleClick}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default UgramModal;
