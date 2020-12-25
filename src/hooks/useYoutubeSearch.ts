import { useEffect, useState } from 'react';
import { getSearch } from '../apis';

type useYouTubeSearchProps = {
  token: string | undefined;
  query: string | null;
};

type item = {
  kind: string;
  etag: any;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: number;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
  };
};

const useYouTubeSearch = ({
  token: access_token,
  query: q,
}: useYouTubeSearchProps) => {
  const [items, setItems] = useState<item[]>();
  useEffect(() => {
    if (!access_token) {
      return;
    }
    if (!q) {
      return;
    }
    (async () => {
      try {
        const { items } = await getSearch({
          access_token,
          part: 'snippet',
          q,
          maxResults: 50,
          type: 'video',
          order: 'date',
          regionCode: 'jp',
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

  return items;
};

export { useYouTubeSearch };
