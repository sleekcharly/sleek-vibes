import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import spotify_icon from '../public/Spotify_icon.svg';
import { SpotifyProvider } from '../typings';

type Props = {
  providers: SpotifyProvider;
};

function Login({ providers }: Props) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <div className="relative w-52 h-52 mb-5">
        <Image src={spotify_icon} layout="fill" />
      </div>

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })} // using the signIn method provided by next-auth to use spotify authentication
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

// ensuring the authentication providers re provided before the login
// loads
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
