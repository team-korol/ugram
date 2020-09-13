import React, { useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../../App';
import YoutubeCard from '../../components/YoutubeCard';
import style from './index.module.css';
import { useYouTubePlayLists } from '../../hooks/useYouTubePlayLists';
import { PAGE_URL } from '../../constants';

const PlayListInfo: React.FC = () => {
  const history = useHistory();
  const { userInfo, serchChannelInfo, setPlayListInfo } = useContext(MyContext);

  const handleCardClick = useCallback(
    (data) => () => {
      setPlayListInfo && setPlayListInfo(data);
      history.push(PAGE_URL.PLAYLIST);
    },
    [setPlayListInfo, history]
  );

  const items = useYouTubePlayLists({
    token: userInfo?.credential?.accessToken,
    channelId: serchChannelInfo?.snippet.resourceId.channelId,
  });

  return (
    <>
      <Helmet title="Channel | Ugram" />
      <section className={style.section}>
        <div className={style.cardWrapper}>
          {!!items?.length &&
            items.map((data, i: number) => (
              <button
                className={style.card}
                key={i}
                onClick={handleCardClick(data)}
                tabIndex={0}
              >
                <YoutubeCard
                  title={data.snippet.title}
                  thumbnailPath={data.snippet.thumbnails.high.url}
                  width={data.snippet.thumbnails.high.width}
                  height={data.snippet.thumbnails.high.height}
                  channelTitle={data.snippet.channelTitle}
                />
              </button>
            ))}
          {!items?.length &&
            !!Object.keys(userInfo).length &&
            [...new Array(18)].map((_, i) => (
              <button className={style.card} key={i}>
                <YoutubeCard
                  title=""
                  thumbnailPath=""
                  channelTitle=""
                  isSkelton={true}
                />
              </button>
            ))}
          {!Object.keys(userInfo).length && <div>Please sign in</div>}
        </div>
      </section>
    </>
  );
};

export default PlayListInfo;
