import { GetServerSideProps } from 'next';
import React from 'react';
import Error from '../../components/Error';
import Layout from '../../components/Layout';

interface SubscriptionConfirmationProps {
  error?: string | null;
}

export const getServerSideProps: GetServerSideProps<
  SubscriptionConfirmationProps
> = async ({ query }) => {
  const { token } = query;
  if (!token) {
    return { props: { error: 'missing token' } };
  }
  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/subscription_tokens?token=${token}`
  );

  if (response.status >= 300) {
    return { props: { error: 'fetch error' } };
  }

  const { data } = await response.json();
  if (data) {
    const { subscriptionId } = data[0];
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'confirmed' }),
    };
    // @ts-ignore
    const response = await fetch(
      `${process.env.BACKEND_API_ENDPOINT}/subscriptions/${subscriptionId}`,
      options
    );

    if (response.status >= 300) {
      return { props: { error: 'fetch error' } };
    }

    return { props: { error: null } };
  }

  return { props: { error: 'server error' } };
};

const SubscriptionConfirmationPage: React.FC<SubscriptionConfirmationProps> = ({
  error,
}) => {
  return (
    <Layout>
      {error && <Error />}
      {!error && (
        <article className="flex justify-center px-12 py-8 xl:px-64">
          <section className="w-full bg-slate-100 p-4 shadow-lg">
            <span className="mb-4 text-2xl font-bold">Congratulations!</span>
            <p className="text-gray-500">Your registration is complete.</p>
          </section>
        </article>
      )}
    </Layout>
  );
};

export default SubscriptionConfirmationPage;
