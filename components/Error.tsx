import React from 'react';

const Error: React.FC = () => {
  return (
    <article className="px-12 py-8">
      <section className="flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-5xl text-gray-900">Sorry...</div>
          <div className="text-xl text-gray-500">Something went wrong</div>
        </div>
      </section>
    </article>
  );
};

export default Error;
