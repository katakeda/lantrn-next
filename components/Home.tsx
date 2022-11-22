import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';

const Home: React.FC = () => {
  const router = useRouter();
  const [zipcode, setZipcode] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.currentTarget.value);
  };

  const handleSearch = () => {
    router.push(`/facilities?zipcode=${zipcode}`);
  };

  return (
    <article className="px-12 py-8">
      <section className="relative h-48">
        <Image src={'/img/hiking.svg'} alt={'banner'} fill />
      </section>
      <section className="mt-8 flex flex-col items-center">
        <div className="text-3xl text-gray-900">Welcome to L∆NTRN</div>
        <div className="text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem,
          aliquam! Maiores voluptas placeat optio facilis minima dicta iste
          pariatur voluptatum facere molestiae doloremque, ab ut quibusdam ipsam
          mollitia eius labore!
        </div>
      </section>
      <section className="mt-8">
        <div className="flex flex-col space-y-1 rounded-md bg-white p-4 shadow-lg md:flex-row md:space-x-1 md:space-y-0">
          <input
            type="text"
            placeholder="Enter zipcode"
            className="flex-1 rounded-sm p-2 text-center ring-1 ring-gray-300 focus:outline-none"
            onChange={handleInputChange}
          />
          <button
            className="flex items-center justify-center space-x-2 rounded-md bg-green-500 p-2 text-white"
            onClick={handleSearch}
          >
            <span>Search</span>
            <MagnifyingGlassIcon className="h-5" />
          </button>
        </div>
      </section>
      <section className="mt-8 flex flex-col space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
        {[...Array(10)].map((_, key) => (
          <div
            key={key}
            className="divide-y-2 rounded-md bg-white p-4 shadow-lg"
          >
            <figure className="relative mx-auto my-4 h-64">
              <Image src={'/img/hiking.svg'} alt={'hiking'} fill />
            </figure>
            <div className="py-4 text-center text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              cumque, distinctio nihil velit adipisci ea ad quo quidem
              voluptatibus commodi magnam excepturi, a ut amet assumenda
              doloremque quae quam? Voluptas!
            </div>
          </div>
        ))}
      </section>
    </article>
  );
};

export default Home;
