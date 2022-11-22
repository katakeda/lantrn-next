import { GetServerSideProps } from 'next';
import React from 'react';
import Error from '../../components/Error';
import Facilities from '../../components/Facilities/Facilities';
import Layout from '../../components/Layout';
import { Facility, FacilityResponseData } from '../../types';
import { buildUrl } from '../../utils/common';

interface FacilitiesProps {
  facilities: Facility[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<FacilitiesProps> = async ({
  query,
}) => {
  let lng, lat;
  if (query.zipcode) {
    {
      const response = await fetch(
        buildUrl(`${process.env.MAPBOX_API_ENDPOINT}/${query.zipcode}.json`, {
          access_token: process.env.MAPBOX_ACCESS_TOKEN,
          types: 'postcode',
          country: 'us',
        })
      );
      if (response.ok) {
        const { features } = await response.json();
        if (features.length > 0) {
          [lng, lat] = features[0].center;
        }
      }
    }
  }
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      apikey: process.env.FACILITY_API_KEY,
    },
  };
  const response = await fetch(
    buildUrl(`${process.env.FACILITY_API_HOST}/api/v1/facilities`, {
      limit: 25,
      offset: 0,
      longitude: lng,
      latitude: lat,
    }),
    // @ts-ignore
    options
  );
  if (response.status >= 300) {
    return { props: { facilities: [], error: 'fetch error' } };
  }
  const data: FacilityResponseData = await response.json();
  return { props: { facilities: data.RECDATA } };
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
