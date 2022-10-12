import { atom } from 'recoil';

export const currentTrackIdState = atom({
  key: 'currentTrackIsState', // uniqu ID (with respect to other atoms/selectors)
  default: null, // default value (aka iitial value)
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
