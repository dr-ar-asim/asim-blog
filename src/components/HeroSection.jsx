'use client'

// components/HeroSection.js

import Image from 'next/image';
import heroImage from '../../public/hero-image.png';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Overview_context from '@/context/overview/overviewContext';

const HeroSection = () => {
  const [web_overview, setWeb_Overview] = useState();

  const { overview } = useContext(Overview_context);
  useEffect(() => {
    const myArr = overview[0];
    setWeb_Overview(myArr);
  }, [overview]);

  return (
    <div className='flex flex-col md:flex-row gap-10 justify-center my-16 md:my-32 px-4 md:px-0'>
      <div className='flex flex-col pt-10 md:pt-20 gap-4 items-center md:items-start'>
        <div className='flex flex-col gap-2 text-center md:text-left'>
          <h3 className='uppercase font-extrabold text-3xl md:text-5xl'>Unlock Your</h3>
          <h2 className='text-custom-orange uppercase font-extrabold text-3xl md:text-5xl'>Potential</h2>
        </div>
        <p className='text-sm md:text-base tracking-widest text-center md:text-left'>Dive into Educational content and Tips</p>
        <Link href={'/posts'} className='bg-custom-orange mt-5 text-center p-4 rounded-lg text-white font-bold transition-all ease-in-out hover:bg-transparent border-transparent border-2 hover:text-custom-orange hover:border-custom-orange'>
          Read More
        </Link>
      </div>
      <div className='flex justify-center md:justify-start'>
        <Image src={heroImage} height={500} width={500} alt='hero image'
        />
      </div>
    </div>
  );
};

export default HeroSection;
