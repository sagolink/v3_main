'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import LottieInView from './ui/LottieInView';
import { Button } from './ui/Button';
import arrow from '@/public/hospitals/lotties/arrowForButton.json';
import { useShrunk } from '../context/shrunkContext';

export default function MainBanner() {
  const { isShrunk, setIsShrunk, isInitialLoad } = useShrunk();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const accidents = [
    {
      type: '질병사고',
      iconSrc: '/common/illness_icon.svg',
      videoSrc: '/common/illness.mp4',
    },
    {
      type: '교통사고',
      iconSrc: '/common/traffic_icon.svg',
      videoSrc: '/common/traffic.mp4',
    },
    {
      type: '일상사고',
      iconSrc: '/common/daily_icon.svg',
      videoSrc: '/common/daily.mp4',
    },
  ];

  // 모바일 여부 감지
  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth;
      const mobile = clientWidth <= 1023;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 모바일일 경우 자동 슬라이드
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % accidents.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // 스크롤에 따라 배너 축소 (데스크탑 전용)
  useLayoutEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const trigger = window.innerHeight * 0.4;

      setIsShrunk(scrollTop > trigger);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, setIsShrunk]);

  return (
    <div className="w-full">
      <section
        className={`relative w-full ${isMobile ? 'h-[657px]' : 'h-[200vh]'} bg-white`}
      >
        <div
          ref={containerRef}
          className={`sticky z-10 flex justify-center overflow-hidden ${
            isMobile
              ? 'h-[657px] bg-black'
              : isShrunk && !isInitialLoad
                ? 'h-[830px] bg-white top-[220px] transition-all duration-700 ease-in-out'
                : 'h-[1080px] top-0'
          }`}
        >
          <div className="relative w-full h-full">
            {/* 모바일 비디오 */}
            {isMobile && (
              <video
                autoPlay
                loop
                muted
                playsInline
                key={selectedIndex}
                className="absolute bottom-[128px] left-0 w-full h-[200px] object-cover object-left-bottom z-10"
              >
                <source
                  src={accidents[selectedIndex].videoSrc}
                  type="video/mp4"
                />
              </video>
            )}

            {/* 데스크탑 비디오*/}
            {!isMobile && (
              <div
                className={`absolute top-0 left-0 w-full flex ${
                  isShrunk && !isInitialLoad
                    ? 'h-[357px] justify-between'
                    : 'h-full gap-0'
                }`}
              >
                {accidents.map((accident, index) => (
                  <div
                    key={accident.type}
                    className={`relative h-full overflow-hidden ${
                      !isInitialLoad ? 'transition-all duration-700' : ''
                    } ${
                      index === 1
                        ? isShrunk && !isInitialLoad
                          ? 'w-[calc(33.33%-0.3rem)]'
                          : 'w-full'
                        : isShrunk && !isInitialLoad
                          ? 'w-[calc(33.33%-0.3rem)] opacity-100'
                          : 'w-0 opacity-0'
                    }`}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={accident.videoSrc} type="video/mp4" />
                    </video>
                    {((isShrunk && !isInitialLoad) || index === 1) && (
                      <div
                        className={`${
                          isShrunk && !isInitialLoad ? 'flex' : 'hidden'
                        } absolute inset-0 flex items-center justify-center pointer-events-none`}
                      >
                        <p className="text-white font-36-bold drop-shadow-md px-4 py-2 rounded">
                          {accident.type}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 콘텐츠 및 버튼 */}
            <div
              className={`sticky top-[116px] ${
                isShrunk && !isInitialLoad ? 'lg:top-[450px]' : 'lg:top-[670px]'
              } lg:bottom-[100px] w-full flex flex-col items-center text-center z-20 `}
            >
              {isMobile && (
                <div className="flex gap-1 mb-3">
                  <img
                    src={accidents[selectedIndex].iconSrc}
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <p className="text-white text-sm">
                    {accidents[selectedIndex].type}
                  </p>
                </div>
              )}
              <h2
                className={`text-4xl lg:text-[64px] font-bold lg:font-extrabold whitespace-pre-wrap leading-12 lg:leading-[80px] ${
                  isShrunk && !isInitialLoad ? 'text-black' : 'text-white'
                }`}
              >
                쉽게, 빠르게,
                <br className="lg:hidden" />
                내가 받을 수 있는 <br /> 보상금을 확인해보세요.
              </h2>
              <div
                // href=""
                className={`${
                  isMobile
                    ? 'flex mt-[270px] max-w-[328px]'
                    : 'hidden lg:flex mt-12'
                } justify-center items-center w-full`}
              >
                <Button
                  onClick={() =>
                    (window.location.href =
                      'https://sagolinkapp.onelink.me/vnCi/dkrele79')
                  }
                  variant="gradiant"
                  size="xl"
                  className={`flex justify-center items-center ${
                    isMobile
                      ? 'w-full font-14-bold px-11'
                      : 'lg:w-[340px] py-8 text-lg'
                  }`}
                >
                  {'1분만에 무료로 예상 보상금 확인하기'}
                  <LottieInView
                    animationData={arrow}
                    className="size-4 ml-2"
                    loop={true}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
