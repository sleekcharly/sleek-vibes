import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from './Song';

type Props = {};

interface Track {
  track: {
    uri: string;
    duration_ms: any;
    artists: any;
    album: any;
    id: React.Key | null | undefined;
    name: string;
  };
}

function Songs({}: Props) {
  const playlist = useRecoilValue<any>(playlistState);
  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {playlist?.tracks.items.map((track: Track, i: number) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
