import { GetServerSideProps } from 'next';
import React from 'react';
import Error from '../../components/Error';
import FacilitiesDetail from '../../components/Facilities/FacilitiesDetail';
import Layout from '../../components/Layout';
import { Facility } from '../../types';
import { buildUrl } from '../../utils/common';

interface FacilitiesDetailProps {
  facility?: Facility;
  availabilities?: string[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  FacilitiesDetailProps
> = async ({ query, res }) => {
  const { id } = query;

  let facility: Facility;
  {
    const response = await fetch(
      buildUrl(`${process.env.BACKEND_API_ENDPOINT}/facilities/${id}`)
    );
    if (response.status >= 300) {
      return { props: { error: 'fetch error' } };
    }
    facility = await response.json();
  }

  let availabilities = new Set<string>();
  {
    const response = await fetch(
      buildUrl(
        `${process.env.AVAILABILITY_API_HOST}/api/camps/availability/campground/${facility.facilityId}/month`,
        {
          start_date: '2022-11-01T00:00:00.000Z',
        }
      )
    );
    if (response.status >= 300) {
      return { props: { error: 'fetch error' } };
    }
    const data = await response.json();
    for (const i in data.campsites) {
      for (const j in data.campsites[i].availabilities) {
        if (data.campsites[i].availabilities[j] === 'Available') {
          availabilities.add(j);
        }
      }
    }
  }

  return { props: { facility, availabilities: Array.from(availabilities) } };
};

const FacilitiesDetailPage: React.FC<FacilitiesDetailProps> = ({
  facility,
  availabilities,
  error,
}) => {
  return (
    <Layout>
      {error && <Error />}
      {!error && facility && (
        <FacilitiesDetail
          facility={facility}
          availabilities={availabilities ?? []}
        />
      )}
    </Layout>
  );
};

export default FacilitiesDetailPage;
