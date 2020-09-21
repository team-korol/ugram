import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { MyContext } from '../../App';
import YoutubePlayer from '../../components/YoutubePlayer';
import { useYouTubeVideos } from '../../hooks/useYouTubeVideos';
import style from './index.module.css';

type Props = {} & RouteComponentProps<{ videoId: string }>;

const SinglePlayer: React.FC<Props> = ({ match }) => {
  const { userInfo, setHeaderText } = useContext(MyContext);
  const item = useYouTubeVideos({
    token: userInfo?.credential?.accessToken,
    id: match.params.videoId,
  });
  setHeaderText?.(item?.snippet.title || 'SEARCH');
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
