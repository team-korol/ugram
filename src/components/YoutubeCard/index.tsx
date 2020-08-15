import React from 'react';
import classNames from 'classnames';
import style from './index.module.css';
import '../../animation/index.css';

type Props = {
  title: string;
  description: string;
  thumbnailPath: string;
  channelTitle: string;
  isSkelton?: boolean;
};

const YoutubeCard: React.FC<Props> = ({
  title,
  description,
  thumbnailPath,
  channelTitle,
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
              <div className="pulseAnimation" />
            </p>
            <p className={style.descriptionSkelton}>
              <div className="pulseAnimation" />
            </p>
          </div>
        </div>
      )}
      {!isSkelton && (
        <div className={style.card}>
          <img className={style.image} src={thumbnailPath} alt={title} />
          <div className={style.wrapper}>
            <h3 className={style.title}>{title}</h3>
            <p className={style.channel}>channel: {channelTitle}</p>
            <p className={style.description}>description: {description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default YoutubeCard;
