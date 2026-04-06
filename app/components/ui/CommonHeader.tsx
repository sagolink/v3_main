'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import arrow from '@/public/common/arrow_outward.svg';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useShrunk } from '@/app/context/shrunkContext';

export default function CommonHeader() {
  const { isShrunk } = useShrunk();
  const router: AppRouterInstance = useRouter();
  const pathname: string = usePathname();
  const navigationItems: { href: string; label: string; id: number }[] = [
    { href: '/traffic', label: '교통사고', id: 1 },
    { href: '/daily', label: '일상사고', id: 2 },
    { href: '/illness', label: '질병사고', id: 3 },
  ];

  const [mounted, setMounted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const updateWidth = () => {
      if (window.innerWidth >= 1024) {
        setIsExpanded(false);
      }
      const clientWidth = document.documentElement.clientWidth;
      const mobile = clientWidth <= 1023;
      setIsMobile(mobile);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  if (!mounted) return null;

  if (pathname === '/hospitals/inquiry' && isMobile) {
    return (
      <div className="bg-white fixed z-50 top-0 flex flex-row justify-center items-center px-4 lg:px-10 w-full h-16 lg:h-20 border-b border-gray-200">
        <div className="flex flex-row items-center justify-between w-full h-full">
          <div
            onClick={() => {
              router.push('/hospitals');
            }}
            className="cursor-pointer h-fit w-fit"
          >
            <Image
              src="/hospitals/arrow_left.svg"
              width={24}
              height={24}
              alt="arrowLeft"
            />
          </div>
        </div>
      </div>
    );
  }

  if (pathname === '/baemin') {
    return (
      <div className="bg-white fixed z-50 top-0 flex flex-row justify-center items-center px-4 lg:px-10 w-full h-16 lg:h-20 border-b border-gray-200">
        <div className="text-black text-base sm:text-xl font-bold">
          배민커넥트 x 사고링크 이벤트
        </div>
      </div>
    );
  }

  const isMainPage = pathname === '/';
  const bgClass = isMobile
    ? 'bg-white'
    : isMainPage && !isShrunk
      ? 'bg-transparent'
      : 'bg-white';
  const textClass = isMobile
    ? 'text-black'
    : isMainPage && !isShrunk
      ? 'text-white'
      : 'text-black';
  const borderClass = isMainPage ? 'border-transparent' : 'border-gray-200';
  const logoSrc = isMobile
    ? '/common/new_logo.svg'
    : isMainPage && !isShrunk
      ? '/common/logo_white.svg'
      : '/common/new_logo.svg';
  const arrowSrc = isMobile
    ? '/common/arrow_outward.svg'
    : isMainPage && !isShrunk
      ? '/common/arrow_outward_white.svg'
      : '/common/arrow_outward.svg';
  const burgerSrc = isMobile
    ? '/common/burger.svg'
    : isMainPage
      ? '/common/burger_white.svg'
      : '/common/burger.svg';

  return (
    <header
      className={`${bgClass} fixed z-50 top-0 flex flex-col justify-center items-center w-full border-b ${borderClass} ${textClass} ${bgClass}`}
    >
      <div
        onClick={() =>
          (window.location.href =
            'https://sago-link.notion.site/sagolink-privacy-notice')
        }
        className="cursor-pointer py-3 bg-gray-200 w-full flex flex-col justify-center items-center"
      >
        <div className="text-sm md:text-lg font-semibold text-black">
          {'[공지] 개인정보 관련 사고 정황에 대한 공식 안내'}
        </div>
      </div>
      <div className="px-4 lg:px-10 py-4 flex flex-row items-center justify-between w-full h-full">
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push('/');
            setIsExpanded(false);
          }}
        >
          <Image
            src={logoSrc}
            width={138.73}
            height={32}
            className="h-[24px] lg:h-[32px] object-contain -ml-2 lg:-ml-0"
            alt="header_logo"
          />
        </div>
        <nav className="flex items-center">
          <ul
            className={`items-center hidden lg:flex font-20-medium text-center align-middle space-x-12 ${textClass}`}
          >
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li
                  key={item.id}
                  className={cn(
                    isActive
                      ? 'text-primary-600 font-20-bold'
                      : 'cursor-pointer',
                  )}
                  onClick={() => {
                    router.push(item.href);
                  }}
                >
                  {item.label}
                </li>
              );
            })}
            <li
              onClick={() => window.open('https://sago-link.notion.site/')}
              className="cursor-pointer w-fit flex items-center justify-center"
            >
              자주 묻는 질문
              <div className="size-6 flex items-center justify-center">
                <Image
                  src={arrowSrc}
                  alt="자주 묻는 질문"
                  width={
                    isMobile ? 12.39 : isMainPage && !isShrunk ? 24 : 12.39
                  }
                  height={
                    isMobile ? 12.39 : isMainPage && !isShrunk ? 24 : 12.39
                  }
                />
              </div>
            </li>
          </ul>
          <div
            className="w-fit h-fit"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Image
              className="light:invert cursor-pointer lg:hidden w-6 sm:w-8"
              src={burgerSrc}
              alt="burger"
              width={24}
              height={24}
              priority
            />
          </div>
        </nav>
      </div>

      <motion.div
        className="fixed top-16 lg:top-20 w-full bg-white overflow-hidden flex flex-col"
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? '100vh' : 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <div className="flex flex-col w-full pt-12 font-24-medium space-y-6 text-black">
          {navigationItems.map(({ label, href, id }) => {
            const isActive = pathname === href;
            return (
              <p
                key={id}
                className={cn(
                  isActive ? 'text-primary-600 font-24-bold' : null,
                  'flex items-center pl-4 cursor-pointer',
                )}
                onClick={() => {
                  router.push(href);
                  setIsExpanded(false);
                }}
              >
                {label}
              </p>
            );
          })}
          <div className="flex items-center pl-4">
            <div
              onClick={() => {
                window.open('https://sago-link.notion.site/');
                setIsExpanded(false);
              }}
              className="cursor-pointer flex items-center"
            >
              자주 묻는 질문
              <div className="size-7 flex items-center justify-center">
                <Image
                  src={arrow}
                  alt="자주 묻는 질문"
                  width={14.46}
                  height={14.46}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
