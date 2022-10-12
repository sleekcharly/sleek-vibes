import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

type Props = {};

// preselected colors
const colors: string[] = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function Center({}: Props) {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<string | null | undefined>(null);

  const playlistID = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistID]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistID)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log('Something went wrong!', err));
  }, [spotifyApi, playlistID]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={signOut}
        >
          <div className="relative w-10 h-10">
            <Image
              src={session?.user?.image}
              alt="user image"
              layout="fill"
              className="rounded-full"
            />
          </div>

          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {/* <Image /> */}

        <img
          src={playlist?.images[0]?.url}
          alt={playlist?.name + ' album art'}
          className="w-44 h-44 shadow-2xl"
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
