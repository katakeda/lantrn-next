import Image from 'next/image';
import React from 'react';

const Main: React.FC = () => {
  return (
    <article className="px-12 py-8">
      <section className="relative h-48">
        <Image src={'/img/hiking.svg'} alt={'banner'} fill />
      </section>
      <section className="mt-8 flex flex-col items-center">
        <div className="text-3xl text-gray-900">Welcome to L∆NTRN</div>
        <div className="text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem,
          aliquam! Maiores voluptas placeat optio facilis minima dicta iste
          pariatur voluptatum facere molestiae doloremque, ab ut quibusdam ipsam
          mollitia eius labore!
        </div>
      </section>
      <section className="mt-8 flex flex-col space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
        {[...Array(10)].map((key, _) => (
          <div
            key={key}
            className="divide-y-2 rounded-md bg-white p-4 shadow-lg"
          >
            <figure className="relative mx-auto my-4 h-64">
              <Image src={'/img/hiking.svg'} alt={'hiking'} fill />
            </figure>
            <div className="py-4 text-center text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              cumque, distinctio nihil velit adipisci ea ad quo quidem
              voluptatibus commodi magnam excepturi, a ut amet assumenda
              doloremque quae quam? Voluptas!
            </div>
          </div>
        ))}
      </section>
    </article>
  );
};

export default Main;
