'use client';

import { cn } from '@/lib/utils';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function SagolinkSteps() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState<string>('/traffic/step1.png');
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: 1, imageSrc: '/traffic/step1.png', title: 'AI 예상 보험금 확인' },
    { id: 2, imageSrc: '/traffic/step2.png', title: '사고링크에 맡기기' },
    { id: 3, imageSrc: '/traffic/step3.png', title: '제대로 보상 받기' },
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
        const next = (prev + 1) % steps.length;
        return next;
      });
    }, 7000);
  }, [isInView, clearAllTimers, startProgressBar, steps.length]);

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

  useEffect(() => {
    setImageSrc(steps[selectedIndex].imageSrc);
  }, [selectedIndex]);

  // 버튼 클릭 핸들러
  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
    const current = steps[index];

    setImageSrc(current.imageSrc);

    if (isInView) {
      startAutoSlide();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex flex-col justify-between items-center py-25 lg:pt-25 lg:pb-50 w-full lg:w-[984px]',
      )}
    >
      <motion.div
        initial={{ opacity: 0.7, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="font-24-bold lg:text-[56px] font-extrabold flex flex-col gap-7 lg:gap-8 items-center lg:items-start w-[246px] lg:w-full"
      >
        <div className="w-6 lg:w-8 h-1 lg:h-[6px] bg-primary-600"></div>
        <div className="text-center lg:text-left">
          <span>3단계면 끝.</span>
          <br className="hidden lg:flex" />
          <span className="ml-1 lg:ml-0">
            복잡한 절차는 사고링크가 처리할게요.
          </span>
        </div>
      </motion.div>
      <div className="flex flex-col items-center  w-full mt-16 lg:mt-30">
        <motion.div
          initial={{ opacity: 0.7, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row lg:gap-8 items-center lg:items-start"
        >
          <Image
            src={imageSrc}
            width={704}
            height={500}
            className="h-auto object-contain w-full  max-w-[328px] lg:max-w-[704px]  lg:w-auto mb-9 lg:mb-0"
            alt="step1"
          />
          <div className="flex flex-col gap-[13px] lg:gap-5">
            {steps &&
              steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className={cn(
                    'relative overflow-hidden flex items-center gap-[4px] lg:gap-4 w-[165px] lg:w-[247px] h-[45px] lg:h-[80px] bg-primary-50 rounded-[50px] cursor-pointer z-0',
                    selectedIndex === index
                      ? 'border-1 lg:border-2 border-primary-600'
                      : 'border-none',
                  )}
                >
                  {selectedIndex === index && isInView && (
                    <div
                      className="absolute top-0 left-0 h-full bg-primary-200 transition-all ease-linear duration-0 z-0"
                      style={{ width: `${progressWidth}%` }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-[4px] lg:gap-4 px-4 lg:px-6">
                    <p className="text-[9px] lg:text-sm font-bold text-white bg-primary-600 w-4 lg:w-6 h-4 lg:h-6 rounded-[50px] flex justify-center items-center">
                      {step.id}
                    </p>
                    <div
                      className={cn(
                        'font-14-bold lg:text-lg',
                        selectedIndex === index
                          ? 'text-primary-600'
                          : 'text-black font-medium',
                      )}
                    >
                      {step.title}
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
