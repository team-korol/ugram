import React, { useState, useCallback } from 'react';
import style from './index.module.css';
import YoutubeCard from '../../components/YoutubeCard';
import UgramModal from '../../components/UgramModal';
import YoutubePlayer from '../../components/YoutubePlayer';
import { Helmet } from 'react-helmet';

const Top: React.FC = () => {
  const dammyData = [
    {
      snippet: {
        title: '動画タイトル',
        description: '今日の晩ご飯は鰹節です',
        thumbnails: {
          default: {
            url:
              'https://i.ytimg.com/vi/3RfrECng4Kk/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAirvQzumYKQRDXkiYdqLJa_K2Bww',
          },
        },
        channelTitle: 'チャンネルタイトル',
        contentDetails: {
          upload: {
            videoId: 'ZuW5ycUro6U',
          },
        },
      },
    },
    {
      snippet: {
        title: '動画タイトル',
        description: '今日の晩ご飯は鰹節です',
        thumbnails: {
          default: {
            url:
              'https://i.ytimg.com/vi/xXyKIWqXoD0/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCSu2wylWmy55qWEbHrO7qbWg4E9g',
          },
        },
        channelTitle: 'チャンネルタイトル',
        contentDetails: {
          upload: {
            videoId: 'ZuW5ycUro6U',
          },
        },
      },
    },
    {
      snippet: {
        title: '動画タイトル',
        description:
          '今日の晩ご飯は鰹節です。最後だしちょっと長めのタイトル置いたりなんかしちゃったりしてね。どうなるのかな。これ',
        thumbnails: {
          default: {
            url:
              'https://i.ytimg.com/vi/IGwfJ7FTGAI/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDq57xojPRBdu9RCJFWPeyRlqJhFg',
          },
        },
        channelTitle: 'チャンネルタイトル',
        contentDetails: {
          upload: {
            videoId: 'ZuW5ycUro6U',
          },
        },
      },
    },
  ];
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    videoId: '',
    channelTitle: '',
  });
  const HandleModalClick = useCallback(() => {
    setIsShowModal(false);
  }, [setIsShowModal]);
  const handleCardClick = useCallback(
    (e) => {
      setModalData({
        title: e.currentTarget.dataset.title,
        description: e.currentTarget.dataset.description,
        videoId: e.currentTarget.dataset.videoId,
        channelTitle: e.currentTarget.dataset.channelTitle,
      });
      setIsShowModal(true);
    },
    [setModalData, setIsShowModal]
  );
  return (
    <>
      <Helmet title="Top | Ugram" />
      {dammyData.map((data, i) => {
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
            data-video-Id={data.snippet.contentDetails.upload.videoId}
            data-channel-title={data.snippet.channelTitle}
          >
            <YoutubeCard
              title={data.snippet.title}
              description={description}
              thumbnailPath={data.snippet.thumbnails.default.url}
              channelTitle={data.snippet.channelTitle}
            />
          </div>
        );
      })}
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
