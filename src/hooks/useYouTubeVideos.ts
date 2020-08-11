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
      const res: any = getVideoList({
        access_token,
        part: ['id'],
        id,
        maxResults: 1,
      });
      setItem(res);
    })();
  }, [access_token, id]);

  return { item };
};

export { useYouTubeVideos };
