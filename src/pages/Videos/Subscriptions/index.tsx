import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MyContext } from '../../../App';
import YoutubeCreatorCard from '../../../components/YoutubeCreatorCard';
import { PAGE_URL } from '../../../constants';
import { useYoutubeSubscriptions } from '../../../hooks/useYoutubeSubscriptions';
import style from './index.module.css';

const Subscriptions: React.FC = () => {
  const { userInfo, setHeaderText } = useContext(MyContext);
  const items = useYoutubeSubscriptions({
    token: userInfo?.credential?.accessToken,
  });

  setHeaderText?.('VIDEOS');

  return (
    <>
      <Helmet title="Videos Home | Ugram" />
      <section className={style.section}>
        <div className={style.cardWrapper}>
          {!!items.length &&
            items.map((item) => (
              <Link
                className={style.card}
                to={`${PAGE_URL.VIDEOS_SUBSCRIPTIONS}/${item.snippet.resourceId.channelId}`}
                key={item.id}
              >
                <YoutubeCreatorCard
                  title={item.snippet.title}
                  thumbnailPath={item.snippet.thumbnails.medium.url}
                  channelTitle={item.snippet.channelTitle}
                />
              </Link>
            ))}
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
