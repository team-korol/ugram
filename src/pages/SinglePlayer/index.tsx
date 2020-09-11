import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../App';
import YoutubePlayer from '../../components/YoutubePlayer';
import { useYouTubeVideos } from '../../hooks/useYouTubeVideos';
import style from './index.module.css';

const SinglePlayer: React.FC = () => {
  const { userInfo, serchQuery } = useContext(MyContext);
  const item = useYouTubeVideos({
    token: userInfo?.credential?.accessToken,
    id: serchQuery,
  });
  return (
    <>
      <Helmet title="Single | Ugram" />
      <section className={style.section}>
        {!!item && (
          <YoutubePlayer
            title={item.snippet.title}
            description={item.snippet.description}
            videoId={item.id}
            channelTitle={item.snippet.channelTitle}
          />
        )}
      </section>
    </>
  );
};

export default SinglePlayer;
