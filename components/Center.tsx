import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';

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
  const [color, setColor] = useState<string | null | undefined>(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
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
        <div>
          {/* <Image /> */}
          <h1>hello</h1>
        </div>
      </section>
    </div>
  );
}

export default Center;
