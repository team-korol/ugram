import React from 'react';
import style from './index.module.css';

type Props = {
  title: string;
  description: string;
  thumbnailPath: string;
  channelTitle: string;
};

const YoutubeCard: React.FC<Props> = ({
  title,
  description,
  thumbnailPath,
  channelTitle,
}: Props) => {
  return (
    <div className={style.card}>
      <img className={style.image} src={thumbnailPath} alt={title} />
      <div className={style.wrapper}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.channel}>channel: {channelTitle}</p>
        <p className={style.description}>description: {description}</p>
      </div>
    </div>
  );
};

export default YoutubeCard;
