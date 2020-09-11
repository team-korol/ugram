import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../App';
import UgramModal from '../../components/UgramModal';
import YoutubeCard from '../../components/YoutubeCard';
import YoutubePlayer from '../../components/YoutubePlayer';
import style from './index.module.css';
import { useYoutubeSearchByChannelId } from '../../hooks/useYoutubeSearchByChannelId';

const Channel: React.FC = () => {
  const { userInfo, serchChannelInfo } = useContext(MyContext);
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

  const items = useYoutubeSearchByChannelId({
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
        <UgramModal
          isShow={isShowModal}
          onCloseButtonHandler={HandleModalClick}
        >
          {!!items?.length && (
            <YoutubePlayer
              title={items[selectIndex].snippet.title}
              description={items[selectIndex].snippet.description}
              videoId={items[selectIndex].id.videoId}
              channelTitle={items[selectIndex].snippet.channelTitle}
              handlePreviousButtonTap={
                selectIndex !== 0
                  ? handleNextPreviousButtonTap(selectIndex - 1)
                  : undefined
              }
              handleNextButtonTap={
                selectIndex <= items.length
                  ? handleNextPreviousButtonTap(selectIndex + 1)
                  : undefined
              }
            />
          )}
        </UgramModal>
      </section>
    </>
  );
};

export default Channel;
