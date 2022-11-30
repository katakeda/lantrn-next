import { GetServerSideProps } from 'next';
import React from 'react';
import Error from '../../components/Error';
import Facilities from '../../components/Facilities/Facilities';
import Layout from '../../components/Layout';
import { FacilitiesResponse, Facility } from '../../types';
import { buildUrl } from '../../utils/common';

interface FacilitiesProps {
  facilities: Facility[];
  total?: number;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<FacilitiesProps> = async ({
  query,
}) => {
  const response = await fetch(
    buildUrl(`${process.env.BACKEND_API_ENDPOINT}/facilities`, {
      lat: query.lat ?? '',
      lng: query.lng ?? '',
      sort: query.sort ?? '',
    })
  );
  if (response.status >= 300) {
    return { props: { facilities: [], error: 'fetch error' } };
  }
  const facilitiesResponse: FacilitiesResponse = await response.json();
  return {
    props: {
      facilities: facilitiesResponse.data,
      total: facilitiesResponse.metadata.total,
    },
  };
};

const FacilitiesPage: React.FC<FacilitiesProps> = ({
  facilities,
  total,
  error,
}) => {
  return (
    <Layout>
      {error && <Error />}
      {!error && (
        <Facilities
          facilities={facilities}
          total={total ?? facilities.length}
        />
      )}
    </Layout>
  );
};

export default FacilitiesPage;
