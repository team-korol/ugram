import React, { useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../App';
import YoutubeCreatorCard from '../../components/YoutubeCreatorCard';
import { useYoutubeSubscriptions } from '../../hooks/useYoutubeSubscriptions';
import style from './index.module.css';
import { PAGE_STATUS } from '../../constants';

const Top: React.FC = () => {
  const { userInfo, setPageStatus, setSerchChannelInfo } = useContext(
    MyContext
  );
  const items = useYoutubeSubscriptions({
    token: userInfo?.credential?.accessToken,
  });

  const handleCardClick = useCallback(
    (data) => () => {
      setSerchChannelInfo && setSerchChannelInfo(data);
      setPageStatus && setPageStatus(PAGE_STATUS.CHANNEL);
    },
    [setSerchChannelInfo, setPageStatus]
  );

  return (
    <>
      <Helmet title="Top | Ugram" />
      <div className={style.cardWrapper}>
        {!!items.length &&
          items.map((data, i: number) => {
            return (
              <div
                className={style.card}
                key={i}
                onClick={handleCardClick(data)}
              >
                <YoutubeCreatorCard
                  title={data.snippet.title}
                  thumbnailPath={data.snippet.thumbnails.high.url}
                  channelTitle={data.snippet.channelTitle}
                />
              </div>
            );
          })}
        {!items.length &&
          !!Object.keys(userInfo).length &&
          [...new Array(18)].map((_, i) => (
            <div className={style.card} key={i}>
              <YoutubeCreatorCard
                title=""
                thumbnailPath=""
                channelTitle=""
                isSkelton={true}
              />
            </div>
          ))}
        {!Object.keys(userInfo).length && <div>Please sign in</div>}
      </div>
    </>
  );
};

export default Top;
