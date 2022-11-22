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
> = async ({ query }) => {
  const { id } = query;

  let facility: Facility;
  {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        apikey: process.env.FACILITY_API_KEY,
      },
    };
    const response = await fetch(
      buildUrl(`${process.env.FACILITY_API_HOST}/api/v1/facilities/${id}`, {
        full: true,
      }),
      // @ts-ignore
      options
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
        `${process.env.AVAILABILITY_API_HOST}/api/camps/availability/campground/${id}/month`,
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
