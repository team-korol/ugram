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
// TODO: デザイン変更
const YoutubeCreatorCard: React.FC<Props> = ({
  title,
  thumbnailPath,
  width = 'auto',
  height = 'auto',
  isSkelton,
}: Props) => {
  return (
    <>
      {isSkelton && (
        <div className={style.cardSkelton}>
          <div className={classNames('pulseAnimation', [style.imageSkelton])} />
          <h4 className={style.titleSkelton}>
            <div className="pulseAnimation" />
          </h4>
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
          />
          <h4 className={style.title}>{title}</h4>
        </div>
      )}
    </>
  );
};

export default YoutubeCreatorCard;
