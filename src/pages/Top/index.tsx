import React, { useState, useCallback } from 'react';
import style from './index.module.css';
import YoutubeCard from '../../components/YoutubeCard';
import UgramModal from '../../components/UgramModal';
import YoutubePlayer from '../../components/YoutubePlayer';

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
      },
    },
    {
      snippet: {
        title: '動画タイトル',
        description: '今日の晩ご飯は鰹節です',
        thumbnails: {
          default: {
            url:
              'https://i.ytimg.com/vi/xXyKIWqXoD0/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCSu2wylWmy55qWEbHrO7qbWg4E9g'
          },
        },
        channelTitle: 'チャンネルタイトル',
      },
    },
    {
      snippet: {
        title: '動画タイトル',
        description: '今日の晩ご飯は鰹節です。最後だしちょっと長めのタイトル置いたりなんかしちゃったりしてね。どうなるのかな。これ',
        thumbnails: {
          default: {
            url:
              'https://i.ytimg.com/vi/IGwfJ7FTGAI/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDq57xojPRBdu9RCJFWPeyRlqJhFg'
          },
        },
        channelTitle: 'チャンネルタイトル',
      },
    },
  ];
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData]= useState({
    title: '',
    description: '',
    thumbnailPath: '',
    cannelTitle: ''
  });
  const HandleModalClick = useCallback(()=>{
    setIsShowModal(false);
  },[setIsShowModal]);
  const handleCardClick = useCallback((e)=>{
    setModalData({
      title: e.currentTarget.dataset.title,
      description: e.currentTarget.dataset.description,
      thumbnailPath: e.currentTarget.dataset.thumbnailPath,
      cannelTitle: e.currentTarget.dataset.channelTitle,
    });
    setIsShowModal(true);
  },[]);
  return (
    <>
      {dammyData.map((data, i) => {
        let description = data.snippet.description;
        if(20 <= data.snippet.description.length){
          description = `${data.snippet.description.substr(0,20)}...`;
        }
        return (
        <div
          className={style.card}
          key={i}
          onClick={handleCardClick}
          data-title={data.snippet.title}
          data-description={data.snippet.description  }
          data-thumbnail-path={data.snippet.thumbnails.default.url}
          data-cannel-title={data.snippet.channelTitle}
        >
          <YoutubeCard
            title={data.snippet.title}
            description={description}
            thumbnailPath={data.snippet.thumbnails.default.url}
            cannelTitle={data.snippet.channelTitle}
          />
        </div>
      );})}
      <UgramModal
        isShow={isShowModal}
        onCloseButtonHandler={HandleModalClick}
      >
        <YoutubePlayer
          title={modalData.title}
          description={modalData.description}
          thumbnailPath={modalData.thumbnailPath}
          cannelTitle={modalData.cannelTitle}
        />
      </UgramModal>
    </>
  );
};

export default Top;
