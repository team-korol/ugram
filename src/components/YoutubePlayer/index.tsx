import React, { useContext } from 'react';
import style from './index.module.css';
import { useYouTubeVideos } from '../../hooks/useYouTubeVideos';
import { MyContext } from '../../App';

type Props = {
  title: string;
  description: string;
  channelTitle: string;
  id: string;
};

const YoutubePlayer: React.FC<Props> = ({
  title,
  description,
  channelTitle,
  id,
}: Props) => {
  const { userInfo } = useContext(MyContext);
  const { item } = useYouTubeVideos({
    token: userInfo?.credential?.accessToken,
    id: id,
  });
  const videoSrc = !!item.videoId
    ? `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : '';
  return (
    <div className={style.card}>
      <div className={style.container}>
        {!!videoSrc && (
          <iframe
            className={style.player}
            title={title}
            width="100%"
            height="100%"
            src={videoSrc}
          />
        )}
      </div>
      <div className={style.wrapper}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.channel}>channel: {channelTitle}</p>
        <p className={style.description}>description: {description}</p>
      </div>
    </div>
  );
};

export default YoutubePlayer;
