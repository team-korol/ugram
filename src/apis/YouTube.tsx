import { get } from './ApiBase';
import {
  API_GET_VIDEO_LIST,
  API_GET_SEARCH,
  API_GET_ACTIVITIES,
  API_GET_SUBSCRIPTIONS,
} from '../routes';

export const getVideoList = async (params = {}, options = {}) => {
  const { list }: any = await get(API_GET_VIDEO_LIST, params, options);
  return { list };
};

export const getSearch = async (params = {}, options = {}) => {
  const { items }: any = await get(API_GET_SEARCH, params, options);
  return { items };
};

export const getActivities = async (params = {}, options = {}) => {
  const { activities }: any = await get(API_GET_ACTIVITIES, params, options);
  return { activities };
};

export const getSubscriptions = async (params = {}, options = {}) => {
  const { items }: any = await get(API_GET_SUBSCRIPTIONS, params, options);
  return { items };
};
