import { get } from './ApiBase';
import {
  API_GET_VIDEO_LIST,
  API_GET_SEARCH,
  API_GET_ACTIVITIES,
  API_GET_SUBSCRIPTIONS,
  API_GET_PLAYLISTS,
  API_GET_PLAYLIST_ITEMS,
} from '../routes';

export const getVideoList = async (params = {}, options = {}) => {
  try {
    const { items }: any = await get(API_GET_VIDEO_LIST, params, options);
    return { items };
  } catch (error) {
    throw error.response;
  }
};

export const getSearch = async (params = {}, options = {}) => {
  try {
    const { items }: any = await get(API_GET_SEARCH, params, options);
    return { items };
  } catch (error) {
    throw error.response;
  }
};

export const getActivities = async (params = {}, options = {}) => {
  try {
    const { activities }: any = await get(API_GET_ACTIVITIES, params, options);
    return { activities };
  } catch (error) {
    throw error.response;
  }
};

export const getSubscriptions = async (params = {}, options = {}) => {
  try {
    const { items }: any = await get(API_GET_SUBSCRIPTIONS, params, options);
    return { items };
  } catch (error) {
    throw error.response;
  }
};

export const getPlayLists = async (params = {}, options = {}) => {
  try {
    const { items }: any = await get(API_GET_PLAYLISTS, params, options);
    return { items };
  } catch (error) {
    throw error.response;
  }
};

export const getPlayListItems = async (params = {}, options = {}) => {
  try {
    const { items }: any = await get(API_GET_PLAYLIST_ITEMS, params, options);
    return { items };
  } catch (error) {
    throw error.response;
  }
};
