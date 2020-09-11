import { useEffect, useState } from 'react';
import { getVideoList } from '../apis';

type useYouTubeVideosProps = {
  token: string | undefined;
  id: string | undefined;
};

type Item = {
  kind: string;
  etag: any;
  id: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage: string;
    defaultLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: number;
    tags: string[];
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
    title: string;
  };
};

const useYouTubeVideos = ({
  token: access_token,
  id,
}: useYouTubeVideosProps) => {
  const [item, setItem] = useState<Item>();
  useEffect(() => {
    if (!access_token) {
      return;
    }
    if (!id) {
      return;
    }
    (async () => {
      try {
        const { items }: any = await getVideoList({
          access_token,
          part: 'snippet',
          id,
          maxResults: 1,
        });
        setItem(items[0]);
      } catch (error) {
        console.log(error);
        if (error.status === 403) {
          console.error('youtube api error.');
        }
      }
    })();
  }, [access_token, id]);

  return item;
};

export { useYouTubeVideos };
