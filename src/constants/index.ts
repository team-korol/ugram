export const apiKeys = {
  YOUTUBE: {
    value: '',
  },
};

export enum PAGE_URL {
  TOP = '/',
  HOME = '/home',
  SEARCH = '/search',
  VIDEOS_SUBSCRIPTIONS = '/videos/subscriptions',
  SINGLE = '/Single/videoId',
  PLAYLIST_SUBSCRIPTIONS = '/playlist/subscriptions',
  PRIVACY_POLICY = '/PrivacyPolicy',
}

export enum ICON {
  SERCH = 'SERCH',
  CLOSE = 'CLOSE',
}

export const SHARE_URL_PATTERN = /https:\/\/youtu.be\//;
export const YOUTUBE_URL_PATTERN = /https:\/\/www.youtube.com\/watch\?v=/;
export const YOUTUBE_MOBILE_URL_PATTERN = /https:\/\/m.youtube.com\/watch\?v=/;
