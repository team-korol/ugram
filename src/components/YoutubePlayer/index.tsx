import React from 'react';
import style from './index.module.css';

type Props = {
  title: string;
  description: string;
  channelTitle: string;
  videoId: string;
};

const YoutubePlayer: React.FC<Props> = ({
  title,
  description,
  channelTitle,
  videoId,
}: Props) => (
  <div className={style.card}>
    <div className={style.container}>
      <iframe
        className={style.player}
        title={title}
        width="100%"
        height="100%"
        allow="fullscreen"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&theme=light&color=white&rel=0&modestbranding=1&playsinline=1&loop=1`}
      />
    </div>
    <div className={style.wrapper}>
      <h4 className={style.title}>{title}</h4>
      <p className={style.channel}>{channelTitle}</p>
      <p className={style.description}>{description}</p>
    </div>
  </div>
);

export default YoutubePlayer;
