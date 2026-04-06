'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, animate } from 'motion/react';
import Image from 'next/image';

export default function SagolinkCategories() {
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const [background, setBackground] = useState<string>('');
  const [partOfBackground, setPartOfBackground] = useState<string>('');
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [arrowSize, setArrowSize] = useState<number>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const bgOpacity = useMotionValue(1);
  const partOpacity = useMotionValue(1);

  const categories = [
    {
      title: '교통사고',
      description: [
        '･ 보상 제대로 받고 싶을 때',
        '･ 직접 싸우는 게 너무 지칠 때',
        '･ 억지로 병원 다니고 싶지 않을 때',
      ],
      backgroundSrc: '/traffic/traffic_background_mo.png',
      partSrc: '/traffic/part_of_traffic_mo.png',
      link: '',
    },
    {
      title: '질병사고',
      description: [
        '･ 질병 보험금을 청구해야 할 때',
        '･ 보험금 지급 거절을 당했을 때',
        '･ 보험금 산정 제대로 해야 할 때',
      ],
      backgroundSrc: '/illnessAccident/illness_background_mo.png',
      partSrc: '/illnessAccident/part_of_illness_mo.png',
      link: '',
    },
    {
      title: '일상사고',
      description: [
        '･ 다쳐서 병원에 다녀왔을 때',
        '･ 치료비를 직접 부담했을 때',
        '･ 혹시 보상을 받을 수 있을지 궁금할 때',
      ],
      backgroundSrc: '/dailyAccident/daily_background_mo.png',
      partSrc: '/dailyAccident/part_of_daily_mo.png',
      link: '',
    },
  ];

  // 타이머들 정리하는 함수
  const clearAllTimers = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
      autoSlideTimer.current = null;
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
    setProgressWidth(0);
  }, []);

  // 프로그레스 바 시작
  const startProgressBar = useCallback(() => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }

    setProgressWidth(0);
    const startTime = Date.now();
    const duration = 7000;

    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setProgressWidth(progress);

      if (progress >= 100) {
        clearInterval(progressTimer.current!);
        progressTimer.current = null;
      }
    }, 16);
  }, []);

  // 자동 슬라이드 시작
  const startAutoSlide = useCallback(() => {
    clearAllTimers();

    if (!isInView) return;

    startProgressBar();

    autoSlideTimer.current = setInterval(() => {
      setSelectedIndex((prev) => {
        const next = (prev + 1) % categories.length;
        return next;
      });
    }, 7000);
  }, [isInView, clearAllTimers, startProgressBar, categories.length]);

  // 화면 크기에 따른 상태 업데이트
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === 'undefined') return;

      const clientWidth = document.documentElement.clientWidth;
      const mobile = clientWidth <= 1023;

      setIsMobile(mobile);
      setWidth(mobile ? 328 : 554);
      setHeight(mobile ? 184 : 312);
      setArrowSize(mobile ? 32 : 48);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 배경 전환효과
  useEffect(() => {
    animate(bgOpacity, 0, { duration: 0.4 });
    animate(partOpacity, 0, { duration: 0.4 });

    const timeout = setTimeout(() => {
      const current = categories[selectedIndex];

      setBackground(
        isMobile
          ? current.backgroundSrc
          : current.backgroundSrc.replace('_mo', '_pc'),
      );
      setPartOfBackground(
        isMobile ? current.partSrc : current.partSrc.replace('_mo', '_pc'),
      );

      animate(bgOpacity, 1, { duration: 0.4 });
      animate(partOpacity, 1, { duration: 0.4 });
    }, 400);

    return () => clearTimeout(timeout);
  }, [selectedIndex, isMobile, bgOpacity, partOpacity]);

  // 초기 렌더링 시 이미지 설정
  useEffect(() => {
    if (categories[selectedIndex]) {
      const current = categories[selectedIndex];
      setBackground(
        isMobile
          ? current.backgroundSrc
          : current.backgroundSrc.replace('_mo', '_pc'),
      );
      setPartOfBackground(
        isMobile ? current.partSrc : current.partSrc.replace('_mo', '_pc'),
      );
    }
  }, [isMobile]);

  // Intersection Observer 등록
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 20% 정도 보일 때
      const threshold = windowHeight * 0.8;
      const shouldBeInView = rect.top < threshold && rect.bottom > 0;

      if (shouldBeInView !== isInView) {
        setIsInView(shouldBeInView);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isInView]);

  // isInView 상태 변경 시 자동 슬라이드 관리
  useEffect(() => {
    if (isInView) {
      startAutoSlide();
    } else {
      clearAllTimers();
    }
    return () => {
      clearAllTimers();
    };
  }, [isInView, startAutoSlide, clearAllTimers]);

  // selectedIndex가 변경될 때마다 프로그레스 바 재시작
  useEffect(() => {
    if (isInView) {
      startProgressBar();
    }
  }, [selectedIndex, isInView, startProgressBar]);

  // 버튼 클릭 핸들러
  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);

    if (isInView) {
      startAutoSlide();
    }
  };

  if (!background || !partOfBackground) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-col justify-between w-full items-center py-25 lg:py-40',
      )}
    >
      {categories.map((category, index) => {
        const isActive = index === selectedIndex;
        const bgSrc = isMobile
          ? category.backgroundSrc
          : category.backgroundSrc.replace('_mo', '_pc');
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]"
            style={{ backgroundImage: `url('${bgSrc}')` }}
          />
        );
      })}
      <div className="flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0.7, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-white font-24-bold lg:text-[56px] font-bold whitespace-pre-wrap text-center"
        >
          <div className="flex flex-col gap-7 lg:gap-8 items-center">
            <div className="w-8 h-[6px] bg-white"></div>
            {'이럴 때, 사고링크에서 알아보세요'}
          </div>
        </motion.div>
      </div>
      <div className="relative">
        {partOfBackground && (
          <motion.div style={{ opacity: partOpacity }}>
            <Image
              src={partOfBackground}
              alt="category part image"
              width={width}
              height={height}
              className="rounded-3xl border-2 border-[#FFFFFF29] mt-14 lg:mt-[100px]"
            />
          </motion.div>
        )}
        {arrowSize && (
          <Image
            src={'/common/arrow_circle_right.svg'}
            alt="이동하기"
            width={arrowSize}
            height={arrowSize}
            className="absolute bottom-[14px] lg:bottom-[18px] right-[14px] lg:right-[18px] cursor-pointer"
          />
        )}
      </div>
      <div className="mt-9 lg:mt-16 flex gap-[10px] lg:gap-4">
        {categories.map((category, index) => (
          <button
            key={`${category.title}-${index}`}
            onClick={() => handleButtonClick(index)}
            className={cn(
              'relative overflow-hidden w-[85px] lg:w-[122px] h-[45px] lg:h-14 border rounded-4xl font-14-bold lg:text-xl cursor-pointer transition-colors duration-300',
              selectedIndex === index
                ? 'bg-white text-black'
                : 'bg-transparent text-white',
            )}
          >
            {category.title}
            {selectedIndex === index && isInView && (
              <div
                className="absolute top-0 left-0 h-full bg-[#a6a6a6]/30 z-10 pointer-events-none transition-all duration-0 ease-linear"
                style={{
                  width: `${progressWidth}%`,
                }}
              />
            )}
          </button>
        ))}
      </div>
      <ul className="flex flex-col text-white font-14-medium lg:text-xl mt-4 lg:mt-6 items-center">
        {categories[selectedIndex].description.map((desc, idx) => (
          <li key={`${categories[selectedIndex].title}-${idx}`}>{desc}</li>
        ))}
      </ul>
    </div>
  );
}
