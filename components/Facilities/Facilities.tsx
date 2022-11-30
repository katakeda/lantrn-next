import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Facility } from '../../types';

interface FacilitiesProps {
  facilities: Facility[];
}

const Facilities: React.FC<FacilitiesProps> = ({ facilities }) => {
  const router = useRouter();

  return (
    <article className="px-12 py-8 xl:px-64">
      <section></section>
      <section>
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
          {facilities.map((facility) => {
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
      <section></section>
    </article>
  );
};

export default Facilities;
