'use client';

import { useState, useEffect } from 'react';
import LottieInView from './ui/LottieInView';
import arrow from '@/public/common/lotties/arrow.json';

export default function SubBanner() {
  const [background, setBackground] = useState<string>('');

  const updateBackground = () => {
    const isMobile = window.innerWidth <= 1023;
    setBackground(
      isMobile
        ? '/common/sub_banner_background_mo.svg'
        : '/common/sub_banner_background_pc.svg',
    );
  };

  useEffect(() => {
    updateBackground();
    window.addEventListener('resize', updateBackground);

    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  if (!background) return null;

  return (
    <div
      className="relative bg-primary-600 w-full h-fit font-24-bold py-[48px] lg:py-[120px] "
      style={{
        backgroundImage: `url('${background}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute" />
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="w-full lg:max-w-[984px] text-center px-7">
          <p className="text-white font-24-bold lg:text-[56px] whitespace-normal">
            얼마나 받을 수 있을지 <br className="block lg:hidden" /> 궁금하시죠.{' '}
            <br className="hidden lg:block" />
            당신의 보상금, <br className="block lg:hidden" /> 간단하게
            확인해보세요
          </p>
        </div>
        <button
          onClick={() =>
            (window.location.href =
              'https://sagolinkapp.onelink.me/vnCi/hnf4sazh')
          }
          className="bg-gradient-to-r from-white to-[#CBD1FF] rounded-[50px] px-[40px] py-[13px] lg:px-12 lg:py-[25px] flex items-center mt-6 lg:mt-12 cursor-pointer   hover:from-[#E0E4FF] hover:to-[#AAB5FF] hover:shadow-[0px_8px_16px_0px_#6778FB52]"
        >
          <p className="font-14-bold lg:text-[20px] text-primary-600">
            1분만에 무료로 예상 보상금 확인하기
          </p>
          <LottieInView animationData={arrow} className="size-6" loop={true} />
        </button>
      </div>
    </div>
  );
}
