import { useEffect, useState } from 'react';
import { getSearch } from '../apis';

type useYoutubeSearchByChannelIdProps = {
  token: string | undefined;
  channelId: string | undefined;
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

const useYoutubeSearchByChannelId = ({
  token: access_token,
  channelId,
}: useYoutubeSearchByChannelIdProps) => {
  const [items, setItems] = useState<item[]>();
  useEffect(() => {
    if (!access_token) {
      return;
    }
    if (!channelId) {
      return;
    }
    (async () => {
      try {
        const { items }: any = await getSearch({
          access_token,
          part: 'snippet',
          channelId,
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
  }, [access_token, channelId]);

  return items;
};

export { useYoutubeSearchByChannelId };
