import { get } from './ApiBase';
import { 
    API_GET_VIDEO_LIST,
    API_GET_SEARCH,
    API_GET_VIDEO_INFO,
 } from '../routes'

export const getVideoList = async (params ={}, options = {}) => {
    try{
        const list = await get(API_GET_VIDEO_LIST, params, options);
        return list;
    } catch(err) {
        throw(err);
    }
}

export const getVideoInfo = async (params ={}, options = {}) => {
    try{
        const list = await get(API_GET_VIDEO_INFO, params, options);
        return list;
    } catch(err) {
        throw(err);
    }
}

export const getSearch = async (params ={}, options = {}) => {
    try{
        const list = await get(API_GET_SEARCH, params, options);
        return list;
    } catch(err) {
        throw(err);
    }
}