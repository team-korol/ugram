import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../../../App';
import UgramModal from '../../../../components/UgramModal';
import YoutubeCard from '../../../../components/YoutubeCard';
import YoutubePlayer from '../../../../components/YoutubePlayer';
import style from './index.module.css';
import { useYoutubeSearchByChannelId } from '../../../../hooks/useYoutubeSearchByChannelId';
import { RouteComponentProps } from 'react-router-dom';

type Props = {} & RouteComponentProps<{ channelId: string }>;

const ChannelId: React.FC<Props> = ({ match }) => {
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

  const items = useYoutubeSearchByChannelId({
    token: userInfo?.credential?.accessToken,
    channelId: match.params.channelId,
  });

  if (!!items?.length) {
    setHeaderText?.(items?.[0].snippet.channelTitle);
  }

  return (
    <>
      <Helmet title="Videos Channel | Ugram" />
      <section className={style.section}>
        <div className={style.cardWrapper}>
          {!!items?.length &&
            items.map((item, i: number) => (
              <button
                className={style.card}
                key={i}
                onClick={handleCardClick(i)}
              >
                <YoutubeCard
                  title={item.snippet.title}
                  thumbnailPath={item.snippet.thumbnails.medium.url}
                  width={item.snippet.thumbnails.medium.width}
                  height={item.snippet.thumbnails.medium.height}
                  channelTitle={item.snippet.channelTitle}
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
                videoId={items[selectIndex].id.videoId}
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

export default ChannelId;
