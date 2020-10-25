import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import { MyContext } from '../../../../App';
import YoutubeCard from '../../../../components/YoutubeCard';
import style from './index.module.css';
import { useYouTubePlayLists } from '../../../../hooks/useYouTubePlayLists';
import { PAGE_URL } from '../../../../constants';
type Props = {} & RouteComponentProps<{ channelId: string }>;

const ChannelId: React.FC<Props> = ({ match }) => {
  const { userInfo, setHeaderText } = useContext(MyContext);

  const items = useYouTubePlayLists({
    token: userInfo?.credential?.accessToken,
    channelId: match.params.channelId,
  });

  if (!!items?.length) {
    setHeaderText?.(items?.[0].snippet.channelTitle);
  }

  return (
    <>
      <Helmet title="Playlist Channel | Ugram" />
      <section className={style.section}>
        <div className={style.cardWrapper}>
          {!!items?.length &&
            items.map((item) => (
              <Link
                to={`${PAGE_URL.PLAYLIST_SUBSCRIPTIONS}/${match.params.channelId}/playlistId/${item.id}`}
                className={style.card}
                key={item.id}
              >
                <YoutubeCard
                  title={item.snippet.title}
                  thumbnailPath={item.snippet.thumbnails.medium.url}
                  width={item.snippet.thumbnails.medium.width}
                  height={item.snippet.thumbnails.medium.height}
                  channelTitle={item.snippet.channelTitle}
                />
              </Link>
            ))}
          {!items?.length &&
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
        </div>
      </section>
    </>
  );
};

export default ChannelId;
