import React, { useEffect, useState } from 'react';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  WindowIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';

// interface for playlist
interface PlayList {
  id: React.Key | null | undefined;
  name:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}

type Props = {};

export default function Sidebar({}: Props) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<any>([]);
  const [playlistID, setPlaylistID] = useState<React.Key | null | undefined>(
    null,
  );

  console.log('you picked this playlist ===> ' + playlistID);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
      <div className="space-y-4">
        <button
          className=" flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <WindowIcon className="h-5 w-5" />
          <p>Log out</p>
        </button>

        <button className=" flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>

        <button className=" flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </button>

        <button className=" flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className=" flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <button className=" flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>

        <button className=" flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        {playlists.map((playlist: PlayList) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistID(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}
