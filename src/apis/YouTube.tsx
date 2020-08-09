import { get } from './ApiBase';
import { API_GET_VIDEO_LIST, API_GET_SEARCH } from '../routes';

export const getVideoList = async (params = {}, options = {}) => {
  const { list }: any = await get(API_GET_VIDEO_LIST, params, options);
  return { list };
};

export const getSearch = async (params = {}, options = {}) => {
  const { result }: any = await get(API_GET_SEARCH, params, options);
  return { result };
};
