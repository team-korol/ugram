import React, { useCallback, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../App';
import UgramModal from '../../components/UgramModal';
import YoutubeCard from '../../components/YoutubeCard';
import YoutubePlayer from '../../components/YoutubePlayer';
import { useYoutubeSubscriptions } from '../../hooks/useYoutubeSubscriptions';
import style from './index.module.css';

const Top: React.FC = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    channelTitle: '',
    videoId: '',
  });
  const { userInfo } = useContext(MyContext);
  const HandleModalClick = useCallback(() => {
    setIsShowModal(false);
  }, [setIsShowModal]);
  const handleCardClick = useCallback(
    (e) => {
      setModalData({
        title: e.currentTarget.dataset.title,
        description: e.currentTarget.dataset.description,
        channelTitle: e.currentTarget.dataset.channelTitle,
        videoId: e.currentTarget.dataset.videoId,
      });
      setIsShowModal(true);
    },
    [setModalData, setIsShowModal]
  );
  const { items }: { items: any } = useYoutubeSubscriptions({
    token: userInfo?.credential?.accessToken,
  });
  return (
    <>
      <Helmet title="Top | Ugram" />
      <div className={style.cardWrapper}>
        {!!items &&
          items.map((data: any, i: number) => {
            let description = data.snippet.description;
            if (20 <= data.snippet.description.length) {
              description = `${data.snippet.description.substr(0, 20)}...`;
            }
            return (
              <div
                className={style.card}
                key={i}
                onClick={handleCardClick}
                data-title={data.snippet.title}
                data-description={data.snippet.description}
                data-video-id={data.id.videoId}
                data-channel-title={data.snippet.channelTitle}
              >
                <YoutubeCard
                  title={data.snippet.title}
                  description={description}
                  thumbnailPath={data.snippet.thumbnails.high.url}
                  channelTitle={data.snippet.channelTitle}
                />
              </div>
            );
          })}
        {!items &&
          !!Object.keys(userInfo).length &&
          [...new Array(18)].map((_, i) => (
            <div className={style.card} key={i}>
              <YoutubeCard
                title=""
                description=""
                thumbnailPath=""
                channelTitle=""
                isSkelton={true}
              />
            </div>
          ))}
        {!Object.keys(userInfo).length && <div>Please sign in</div>}
      </div>
      <UgramModal isShow={isShowModal} onCloseButtonHandler={HandleModalClick}>
        <YoutubePlayer
          title={modalData.title}
          description={modalData.description}
          videoId={modalData.videoId}
          channelTitle={modalData.channelTitle}
        />
      </UgramModal>
    </>
  );
};

export default Top;
