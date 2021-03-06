import React from 'react';
import style from './index.module.css';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
type Props = {
  title: string;
  description: string;
  channelTitle: string;
  videoId: string;
  handlePreviousButtonTap?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  handleNextButtonTap?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
};

const YoutubePlayer: React.FC<Props> = ({
  title,
  description,
  channelTitle,
  videoId,
  handlePreviousButtonTap,
  handleNextButtonTap,
}: Props) => {
  return (
    <div className={style.card}>
      <div className={style.container}>
        <iframe
          className={style.player}
          title={title}
          width="100%"
          height="100%"
          allow="fullscreen"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&theme=light&color=white&rel=0&modestbranding=1&playsinline=1&&playlist=${videoId}&loop=1`}
        />
      </div>
      <div className={style.wrapper}>
        {(!!handlePreviousButtonTap || !!handleNextButtonTap) && (
          <div className={style.left}>
            {!!handlePreviousButtonTap && (
              <button onClick={handlePreviousButtonTap}>
                <RiArrowLeftSLine size="30px" />
              </button>
            )}
          </div>
        )}
        <div className={style.main}>
          <h4 className={style.title}>{title}</h4>
          <p className={style.channel}>{channelTitle}</p>
          <p className={style.description}>{description}</p>
        </div>
        {(!!handlePreviousButtonTap || !!handleNextButtonTap) && (
          <div className={style.right}>
            {!!handleNextButtonTap && (
              <button onClick={handleNextButtonTap}>
                <RiArrowRightSLine size="30px" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default YoutubePlayer;
