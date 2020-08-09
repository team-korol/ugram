import axios from 'axios';

const TIMEOUT_MILSEC = 60000;

export const get = (url: string, data = {}, options = {}) => {

    const request = axios.create({
      timeout: TIMEOUT_MILSEC,
      ...options,
    });
  
    request.interceptors.response.use(
      (response) => {
        if (response.data && response.data.obj) {
          return response.data.obj;
        }
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return request.get(url, { params: data });
}
