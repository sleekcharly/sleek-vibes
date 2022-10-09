import SpotifyWebApi from 'spotify-web-api-node';

const scopes: string = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaboration',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  // "user-library-modify",
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',');

const params = {
  scope: scopes,
};

const queryParamString: {} = new URLSearchParams(params);

const LOGIN_URL: string = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;
