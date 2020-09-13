import React, { useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../../App';
import YoutubeCreatorCard from '../../components/YoutubeCreatorCard';
import { PAGE_URL } from '../../constants';
import { useYoutubeSubscriptions } from '../../hooks/useYoutubeSubscriptions';
import style from './index.module.css';

const Home: React.FC = () => {
  const history = useHistory();
  const { userInfo, setSerchChannelInfo } = useContext(MyContext);
  const items = useYoutubeSubscriptions({
    token: userInfo?.credential?.accessToken,
  });

  const handleCardClick = useCallback(
    (data) => () => {
      setSerchChannelInfo && setSerchChannelInfo(data);
      history.push(PAGE_URL.CHANNEL);
    },
    [setSerchChannelInfo, history]
  );

  return (
    <>
      <Helmet title="Top | Ugram" />
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
        </div>
      </section>
    </>
  );
};

export default Home;
