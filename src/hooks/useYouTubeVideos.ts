import { useEffect, useState } from 'react';
import { getVideoList } from '../apis';

type useYouTubeVideosProps = {
  token: string | undefined;
  id: string | undefined;
};

type StateType = any;

const useYouTubeVideos = ({
  token: access_token,
  id,
}: useYouTubeVideosProps) => {
  const [item, setItem] = useState<StateType>();
  useEffect(() => {
    if (!access_token) {
      return;
    }
    if (!id) {
      return;
    }
    (() => {
      try {
        const res: any = getVideoList({
          access_token,
          part: ['id'],
          id,
          maxResults: 1,
        });
        setItem(res);
      } catch (error) {
        console.log(error);
        if (error.status === 403) {
          console.error('youtube api error.');
        }
      }
    })();
  }, [access_token, id]);

  return { item };
};

export { useYouTubeVideos };
