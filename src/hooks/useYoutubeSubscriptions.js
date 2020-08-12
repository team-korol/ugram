import { useEffect, useState } from 'react';
import { getSubscriptions, getSearch } from '../apis';
import dayjs from 'dayjs';

const useYoutubeSubscriptions = ({ token: access_token }) => {
  const [items, setItems] = useState();
  const [sortedItems, setSortedItems] = useState();

  useEffect(() => {
    if (!access_token) {
      return;
    }
    (async () => {
      const { items } = await getSubscriptions({
        access_token,
        part: 'snippet',
        mine: true,
        maxResults: 18,
        order: 'unread',
      });
      setItems(items);
    })();
  }, [access_token]);

  useEffect(() => {
    if (!items) {
      return;
    }

    Promise.all(
      items.map(({ snippet }) =>
        getSearch({
          access_token,
          part: 'snippet',
          type: 'video',
          maxResults: 1,
          channelId: snippet.resourceId.channelId,
        })
      )
    ).then((ress) => {
      const dataAll = ress.map((res) => res.items[0]);
      const sortedData = dataAll.sort((a, b) => {
        const aDate = new Date(dayjs().format(a.snippet.publishedAt));
        const bDate = new Date(dayjs().format(b.snippet.publishedAt));
        return bDate - aDate;
      });
      setSortedItems(sortedData);
    });
  }, [access_token, items]);

  return { items: sortedItems };
};

export { useYoutubeSubscriptions };
