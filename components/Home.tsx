import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const apiLibraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

const Home: React.FC = () => {
  const router = useRouter();
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete>();
  const [latLng, setLatLng] = useState<[number, number]>();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_PLACES_API_KEY!,
    libraries: apiLibraries,
  });

  const handleOnLoad = (a: google.maps.places.Autocomplete) => {
    setAutoComplete(a);
  };

  const handlePlaceChange = () => {
    if (autoComplete) {
      const location = autoComplete.getPlace().geometry?.location;
      if (location) {
        setLatLng([location.lat(), location.lng()]);
      }
    }
  };

  const handleSearch = () => {
    if (latLng) {
      const [lat, lng] = latLng;
      router.push(`/facilities?lat=${lat}&lng=${lng}`);
    }
  };

  return (
    <article className="px-12 py-8 xl:px-64">
      <section className="relative h-48">
        <Image src={'/img/hiking.svg'} alt={'banner'} fill priority />
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
          {isLoaded && (
            <Autocomplete
              className="flex-1"
              restrictions={{ country: 'us' }}
              fields={['geometry']}
              types={['(regions)']}
              onLoad={handleOnLoad}
              onPlaceChanged={handlePlaceChange}
            >
              <input
                type="text"
                placeholder="Enter City or Zipcode"
                className="w-full rounded-sm p-2 text-center ring-1 ring-gray-300 focus:outline-none"
              />
            </Autocomplete>
          )}
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
