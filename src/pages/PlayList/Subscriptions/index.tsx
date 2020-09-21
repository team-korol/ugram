import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MyContext } from '../../../App';
import YoutubeCreatorCard from '../../../components/YoutubeCreatorCard';
import { useYoutubeSubscriptions } from '../../../hooks/useYoutubeSubscriptions';
import style from './index.module.css';
import { PAGE_URL } from '../../../constants';

const Subscriptions: React.FC = () => {
  const { userInfo, setHeaderText } = useContext(MyContext);
  const items = useYoutubeSubscriptions({
    token: userInfo?.credential?.accessToken,
  });

  setHeaderText?.('PLAY LIST');

  return (
    <>
      <Helmet title="PlayList Home| Ugram" />
      <section className={style.section}>
        <div className={style.cardWrapper}>
          {!!items.length &&
            items.map((item) => {
              return (
                <Link
                  className={style.card}
                  to={`${PAGE_URL.PLAYLIST_SUBSCRIPTIONS}/${item.snippet.resourceId.channelId}`}
                  key={item.id}
                >
                  <YoutubeCreatorCard
                    title={item.snippet.title}
                    thumbnailPath={item.snippet.thumbnails.high.url}
                    channelTitle={item.snippet.channelTitle}
                  />
                </Link>
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

export default Subscriptions;
