import { useEffect, useState } from 'react';
import { getPlayListItems } from '../apis';

type useYouTubePlayListItemsProps = {
  token: string | undefined;
  playlistId: string | undefined;
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
        width: string;
        height: number;
      };
      medium: {
        url: string;
        width: string;
        height: number;
      };
      high: {
        url: string;
        width: string;
        height: number;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: string;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
};

const useYouTubePlayListItems = ({
  token: access_token,
  playlistId,
}: useYouTubePlayListItemsProps) => {
  const [items, setItems] = useState<Item[] | null>();
  useEffect(() => {
    if (!access_token) {
      return;
    }
    if (!playlistId) {
      return;
    }
    (async () => {
      try {
        const { items }: any = await getPlayListItems({
          access_token,
          part: 'snippet',
          playlistId,
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
  }, [access_token, playlistId]);

  return items;
};

export { useYouTubePlayListItems };
