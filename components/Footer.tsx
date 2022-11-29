import React from 'react';

const Footer: React.FC = () => {
  return (
    <article className="py-8 px-12 xl:px-64">
      <div className="flex flex-col items-center justify-around space-y-2 md:flex-row md:space-y-0">
        <section>
          <span>{`© ${new Date().getFullYear()} Lantrn`}</span>
        </section>
        <section className="flex flex-col items-center space-y-2 md:flex-row md:space-x-3 md:space-y-0">
          <span>About</span>
          <span>Contact</span>
        </section>
      </div>
    </article>
  );
};

export default Footer;
