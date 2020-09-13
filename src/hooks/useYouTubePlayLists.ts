import { useEffect, useState } from 'react';
import { getPlayLists } from '../apis';

type useYouTubePlayListsProps = {
  token: string | undefined;
  channelId: string | undefined;
};

type Item = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
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
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    localized: {
      title: string;
      description: string;
    };
  };
};

const useYouTubePlayLists = ({
  token: access_token,
  channelId,
}: useYouTubePlayListsProps) => {
  const [items, setItems] = useState<Item[] | null>(null);
  useEffect(() => {
    if (!access_token) {
      return;
    }
    if (!channelId) {
      return;
    }
    (async () => {
      try {
        const { items }: any = await getPlayLists({
          access_token,
          part: 'snippet',
          channelId,
          maxResults: 50,
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

export { useYouTubePlayLists };
