import { useEffect, useState } from 'react';
import { getSubscriptions } from '../apis';

type Args = {
  token: string;
};

type SubscriptionsItem = {
  kind: string;
  etag: any;
  id: string;
  snippet: {
    publishedAt: number;
    channelTitle: string;
    title: string;
    description: string;
    resourceId: {
      kind: string;
      channelId: string;
    };
    channelId: string;
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
  };
};

const useYoutubeSubscriptions = ({ token: access_token }: Args) => {
  const [items, setItems] = useState<SubscriptionsItem[]>([]);
  useEffect(() => {
    if (!access_token) {
      return;
    }
    (async () => {
      try {
        const { items } = await getSubscriptions({
          access_token,
          part: 'snippet',
          mine: true,
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
  }, [access_token]);

  return items;
};

export { useYoutubeSubscriptions };
