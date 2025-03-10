'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { footerLinks } from '@/constants'; // Import the footerLinks array
import { usePathname } from 'next/navigation'


const Footer = () => {
    const pathname = usePathname() //to get the path name (this would help us figure out which is active)
  
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href={'/'}>
          <Image
            src={'/assets/images/logo.svg'}
            alt='menu'
            width={128}
            height={28}
            className='cursor-pointer'
          />
        </Link>

        {/* Footer Links */}
        <ul className='flex flex-col gap-4 sm:flex-row sm:gap-8'>
          {footerLinks.map((link) => {
            const isActive = link.route === pathname
            return (
            <li key={link.route}>
              <Link
                href={link.route}
                className={`${isActive && 'text-primary-500'}  p-regular-16 whitespace-nowrap hover:text-primary-500`}
              >
                {link.label}
              </Link>
            </li> )
          })}
        </ul>

        <p>2025 GoEvents. Created by Miracle</p>
      </div>
    </footer>
  );
};

export default Footer;





