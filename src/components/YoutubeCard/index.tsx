import React from 'react';
import classNames from 'classnames';
import style from './index.module.css';
import '../../animation/index.css';

type Props = {
  title: string;
  thumbnailPath: string;
  channelTitle: string;
  width?: number | string;
  height?: number | string;
  isSkelton?: boolean;
};

const YoutubeCard: React.FC<Props> = ({
  title,
  thumbnailPath,
  channelTitle,
  width = 'auto',
  height = 'auto',
  isSkelton,
}: Props) => {
  return (
    <>
      {isSkelton && (
        <div className={style.cardSkelton}>
          <div className={classNames('pulseAnimation', [style.imageSkelton])} />
          <div className={style.wrapperSkelton}>
            <h3 className={style.titleSkelton}>
              <div className="pulseAnimation" />
            </h3>
            <p className={style.channelSkelton}>
              <span className="pulseAnimation" />
            </p>
          </div>
        </div>
      )}
      {!isSkelton && (
        <div className={style.card}>
          <img
            className={style.image}
            src={thumbnailPath}
            width={width}
            height={height}
            alt={title}
            loading="lazy"
          />
          <div className={style.wrapper}>
            <h4 className={style.title}>{title}</h4>
            <p>{channelTitle}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default YoutubeCard;
