import { GetServerSideProps } from 'next';
import React from 'react';
import Error from '../../components/Error';
import Facilities from '../../components/Facilities/Facilities';
import Layout from '../../components/Layout';
import { Facility } from '../../types';
import { buildUrl } from '../../utils/common';

interface FacilitiesProps {
  facilities: Facility[];
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
  const facilities = await response.json();
  return { props: { facilities } };
};

const FacilitiesPage: React.FC<FacilitiesProps> = ({ facilities, error }) => {
  return (
    <Layout>
      {error && <Error />}
      {!error && <Facilities facilities={facilities} />}
    </Layout>
  );
};

export default FacilitiesPage;
