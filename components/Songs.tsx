import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from './Song';

type Props = {};

interface Track {
  track: {
    album: any;
    id: React.Key | null | undefined;
  };
}

function Songs({}: Props) {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {playlist?.tracks.items.map((track: Track, i: number) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
