import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../App';
import UgramModal from '../../components/UgramModal';
import YoutubeCard from '../../components/YoutubeCard';
import YoutubePlayer from '../../components/YoutubePlayer';
import style from './index.module.css';
import { useYouTubeSearch } from '../../hooks/useYoutubeSearch';
import { useQuery } from '../../hooks/useQuery';

const Search: React.FC = () => {
  const { userInfo, setHeaderText } = useContext(MyContext);
  setHeaderText?.('SEARCH');

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
  const query = useQuery();
  const items = useYouTubeSearch({
    token: userInfo?.credential?.accessToken,
    query: query.get('q'),
  });
  return (
    <>
      <Helmet title="Search | Ugram" />
      <section className={style.section}>
        <div className={style.cardWrapper}>
          {!!items?.length &&
            items.map((data, i: number) => (
              <button
                className={style.card}
                key={i}
                onClick={handleCardClick(i)}
              >
                <YoutubeCard
                  title={data.snippet.title}
                  thumbnailPath={data.snippet.thumbnails.medium.url}
                  width={data.snippet.thumbnails.medium.width}
                  height={data.snippet.thumbnails.medium.height}
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

export default Search;
