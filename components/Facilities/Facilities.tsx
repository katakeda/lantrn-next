import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Facility } from '../../types';
import { useRouter } from 'next/router';

interface FacilitiesProps {
  facilities: Facility[];
}

const Facilities: React.FC<FacilitiesProps> = ({ facilities }) => {
  const router = useRouter();

  return (
    <article className="px-12 py-8">
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
                  <PhotoIcon className="h-32 w-full" />
                </figure>
                <div className="text-lg text-gray-500">{facility.name}</div>
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
