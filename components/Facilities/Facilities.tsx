import {
  ArrowUpIcon,
  ChevronDownIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FacilitiesResponse, Facility } from '../../types';

interface FacilitiesProps {
  facilities: Facility[];
  total: number;
}

const Facilities: React.FC<FacilitiesProps> = ({ facilities, total }) => {
  const router = useRouter();
  const [showSort, setShowSort] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [facilitiesState, setFacilitiesState] =
    useState<Facility[]>(facilities);
  const [page, setPage] = useState<number>(1);
  const { lat, lng, sort } = router.query;

  useEffect(() => {
    setFacilitiesState(facilities);
  }, [facilities]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSort = () => {
    setShowSort((prev) => !prev);
  };

  const handleSort = (sortBy: string) => {
    router.push(`/facilities?lat=${lat}&lng=${lng}&sort=${sortBy}`);
  };

  const handleLoad = async () => {
    const response = await fetch(
      `/api/facilities?lat=${lat}&lng=${lng}&sort=${sort}&page=${page + 1}`
    );
    if (response.status >= 300) {
      return setLoadError(true);
    }
    const facilitiesResponse: FacilitiesResponse = await response.json();
    setFacilitiesState((prev) => [...prev, ...facilitiesResponse.data]);
    setPage((prev) => prev + 1);
  };

  return (
    <article className="px-12 py-8 xl:px-64">
      <section className="mb-4">
        <div className="flex justify-between bg-white p-4 shadow-lg">
          <section>Filter</section>
          <section className="relative">
            <span
              className="flex cursor-pointer items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
              onClick={toggleSort}
            >
              <span>Sort By</span>
              <ChevronDownIcon className="h-4" />
            </span>
            <div
              className={[
                'absolute right-0 z-10 mt-1 transform bg-white p-3 shadow-lg transition duration-100 ease-in-out',
                showSort ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
              ].join(' ')}
            >
              <div className="flex flex-col space-y-1 text-sm text-gray-500">
                <span
                  className="cursor-pointer"
                  onClick={() => handleSort('az')}
                >
                  A-Z
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleSort('za')}
                >
                  Z-A
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleSort('new')}
                >
                  Newest
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section>
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
          {facilitiesState.map((facility) => {
            return (
              <div
                key={facility.id}
                className="cursor-pointer rounded-md bg-white p-4 shadow-lg"
                onClick={() => router.push(`/facilities/${facility.id}`)}
              >
                <figure>
                  {facility.primaryImg ? (
                    <div className="relative h-48 w-full">
                      <Image
                        src={facility.primaryImg}
                        alt={'Facility Image'}
                        fill
                      />
                    </div>
                  ) : (
                    <PhotoIcon className="h-48 w-full py-4" />
                  )}
                </figure>
                <div className="mt-4 text-lg text-gray-500">
                  {facility.name}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {facilitiesState.length < total && (
        <section>
          <div className="flex w-full items-center justify-center p-4">
            <button
              className="cursor-pointer rounded-md p-2 text-gray-500 shadow-md hover:shadow-lg"
              onClick={handleLoad}
            >
              Load More
            </button>
          </div>
        </section>
      )}
      {loadError && (
        <section>
          <div className="p-4 text-center text-red-500">
            Something went wrong
          </div>
        </section>
      )}
      <section className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-center p-4">
        <button
          className="cursor-pointer rounded-full bg-black p-4 text-white opacity-75"
          onClick={scrollToTop}
        >
          <ArrowUpIcon className="h-5" />
        </button>
      </section>
    </article>
  );
};

export default Facilities;
