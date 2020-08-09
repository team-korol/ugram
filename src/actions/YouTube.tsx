import { apiKey } from '../constants';
import { 
    getVideoList,
    getVideoInfo,
    getSearch,
 } from '../apis';

export const apiGetVideoList = (params = {}, options = {}) => {
    return async () => {
      try {
        return await getVideoList(params, options);
      } catch(error) {
        console.log(error);
        throw(error);
      }
    }
  };

  export const apiGetVideoInfo = (params = {}, options = {}) => {
    return async () => {
      try {
        return await getVideoInfo(params, options);
      } catch(error) {
        console.log(error);
        throw(error);
      }
    }
  };


  export const apiGetSearch = (params = {}, options = {}) => {
    return async () => {
      try {
        return await getSearch(params, options);
      } catch(error) {
        console.log(error);
        throw(error);
      }
    }
  };
