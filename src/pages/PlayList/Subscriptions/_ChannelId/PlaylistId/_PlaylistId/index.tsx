import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../../../../../App';
import UgramModal from '../../../../../../components/UgramModal';
import YoutubeCard from '../../../../../../components/YoutubeCard';
import YoutubePlayer from '../../../../../../components/YoutubePlayer';
import style from './index.module.css';
import { useYouTubePlayListItems } from '../../../../../../hooks/useYouTubePlayListItems';
import { RouteComponentProps } from 'react-router-dom';

type Props = {} & RouteComponentProps<{
  channelId: string;
  playListId: string;
}>;

const PlayListId: React.FC<Props> = ({ match }) => {
  const { userInfo, setHeaderText } = useContext(MyContext);
  const onKeyDown = () => setIsShowModal(false);
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const HandleModalClick = useCallback(() => {
    setIsShowModal(false);
  }, [setIsShowModal]);
  const handleCardClick = useCallback(
    (index) => () => {
      setSelectIndex(index);
      setIsShowModal(true);
    },
    [setSelectIndex, setIsShowModal]
  );
  const handleNextPreviousButtonTap = useCallback(
    (index) => () => {
      setSelectIndex(index);
    },
    [setSelectIndex]
  );

  const items = useYouTubePlayListItems({
    token: userInfo?.credential?.accessToken,
    playlistId: match.params.playListId,
  });

  if (!!items?.length) {
    setHeaderText?.(items?.[0].snippet.channelTitle);
  }

  return (
    <>
      <Helmet title="Playlist videos | Ugram" />
      <section className={style.section}>
        <div className={style.cardWrapper}>
          {!!items?.length &&
            items.map((data, i: number) => (
              <button
                className={style.card}
                key={i}
                onClick={handleCardClick(i)}
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
        {isShowModal && (
          <UgramModal onCloseButtonHandler={HandleModalClick}>
            {!!items?.length && (
              <YoutubePlayer
                title={items[selectIndex].snippet.title}
                description={items[selectIndex].snippet.description}
                videoId={items[selectIndex].snippet.resourceId.videoId}
                channelTitle={items[selectIndex].snippet.channelTitle}
                handlePreviousButtonTap={
                  selectIndex !== 0
                    ? handleNextPreviousButtonTap(selectIndex - 1)
                    : undefined
                }
                handleNextButtonTap={
                  selectIndex < items.length - 1
                    ? handleNextPreviousButtonTap(selectIndex + 1)
                    : undefined
                }
              />
            )}
          </UgramModal>
        )}
      </section>
    </>
  );
};

export default PlayListId;
