import React from 'react';
import style from './index.module.css';
import YoutubeCard from '../../components/YoutubeCard';

const Top: React.FC = () => {
  const dammyData =[
    {
      "snippet": {
        "title": "動画タイトル",
        "description": "今日の晩ご飯は鰹節です",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/3RfrECng4Kk/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAirvQzumYKQRDXkiYdqLJa_K2Bww",
          }
        },
        "channelTitle": "チャンネルタイトル"
      },
    },
    {
      "snippet": {
        "title": "動画タイトル",
        "description": "今日の晩ご飯は鰹節です",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/3RfrECng4Kk/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAirvQzumYKQRDXkiYdqLJa_K2Bww",
          }
        },
        "channelTitle": "チャンネルタイトル"
      },
    },
    {
      "snippet": {
        "title": "動画タイトル",
        "description": "今日の晩ご飯は鰹節です",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/3RfrECng4Kk/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAirvQzumYKQRDXkiYdqLJa_K2Bww",
          }
        },
        "channelTitle": "チャンネルタイトル"
      },
    }
  ]
  return (
    <>
      {dammyData.map((data)=>(
        <div className={style.card}>
          <YoutubeCard
            title={data.snippet.title}
            description={data.snippet.description}
            thumbnailPath={data.snippet.thumbnails.default.url}
            cannelTitle={data.snippet.channelTitle}
          />
        </div>
      ))}
    </>
  );
};

export default Top;
