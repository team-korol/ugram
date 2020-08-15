import { useEffect, useState } from 'react';
import { getSearch } from '../apis';

type useYouTubeSearchProps = {
  token: string | undefined;
  query: string | undefined;
};

type StateType = any;

const useYouTubeSearch = ({
  token: access_token,
  query: q,
}: useYouTubeSearchProps) => {
  const [items, setItems] = useState<StateType>();
  useEffect(() => {
    if (!access_token) {
      return;
    }
    if (!q) {
      return;
    }
    (async () => {
      try {
        const { items }: any = await getSearch({
          access_token,
          part: 'snippet',
          q,
          maxResults: 50,
          type: 'video',
        });
        setItems(items);
      } catch (error) {
        console.log(error);
        if (error.status === 403) {
          console.error('youtube api error.');
        }
      }
    })();
  }, [access_token, q]);

  return { items };
};

export { useYouTubeSearch };
