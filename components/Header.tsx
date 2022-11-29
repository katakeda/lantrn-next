import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between py-8 px-12 xl:px-64">
      <Link href={'/'}>
        <div className="flex cursor-pointer">
          <span className="mr-2">
            <Image src={'/img/logo.svg'} alt={'logo'} width={32} height={32} />
          </span>
          <span className="text-2xl text-gray-500">L∆NTRN</span>
        </div>
      </Link>
      <div>Nav</div>
    </div>
  );
};

export default Header;
