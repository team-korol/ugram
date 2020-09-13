import React, { useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../../App';
import YoutubeCreatorCard from '../../components/YoutubeCreatorCard';
import { useYoutubeSubscriptions } from '../../hooks/useYoutubeSubscriptions';
import style from './index.module.css';
import { PAGE_URL } from '../../constants';

const PlayListHome: React.FC = () => {
  const history = useHistory();
  const { userInfo, setSerchChannelInfo } = useContext(MyContext);
  const items = useYoutubeSubscriptions({
    token: userInfo?.credential?.accessToken,
  });

  const handleCardClick = useCallback(
    (data) => () => {
      setSerchChannelInfo && setSerchChannelInfo(data);
      history.push(PAGE_URL.PLAYLIST_INFO);
    },
    [setSerchChannelInfo, history]
  );

  return (
    <>
      <Helmet title="PlayList Home | Ugram" />
      <section className={style.section}>
        <div className={style.cardWrapper}>
          {!!items.length &&
            items.map((data, i: number) => {
              return (
                <button
                  className={style.card}
                  key={i}
                  onClick={handleCardClick(data)}
                  tabIndex={0}
                >
                  <YoutubeCreatorCard
                    title={data.snippet.title}
                    thumbnailPath={data.snippet.thumbnails.high.url}
                    channelTitle={data.snippet.channelTitle}
                  />
                </button>
              );
            })}
          {!items.length &&
            !!Object.keys(userInfo).length &&
            [...new Array(18)].map((_, i) => (
              <button className={style.card} key={i}>
                <YoutubeCreatorCard
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

export default PlayListHome;
