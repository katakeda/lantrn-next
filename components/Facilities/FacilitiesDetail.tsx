import React from 'react';
import { Facility } from '../../types';

interface FacilitiesDetailProps {
  facility: Facility;
  availabilities: string[];
}

const FacilitiesDetail: React.FC<FacilitiesDetailProps> = ({
  facility,
  availabilities,
}) => {
  return (
    <article className="px-12 py-8 xl:px-64">
      <div>{facility.name}</div>
      <div>
        {availabilities.map((date, key) => (
          <span key={key}>{date}</span>
        ))}
      </div>
    </article>
  );
};

export default FacilitiesDetail;
