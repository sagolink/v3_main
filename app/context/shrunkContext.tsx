'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { usePathname } from 'next/navigation';

interface ShrunkContextType {
  isShrunk: boolean;
  setIsShrunk: (value: boolean) => void;
  isInitialLoad: boolean;
}

const ShrunkContext = createContext<ShrunkContextType | undefined>(undefined);

export const ShrunkProvider = ({ children }: { children: ReactNode }) => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 메인 페이지로 돌아올 때 초기 상태로 리셋
    if (pathname === '/') {
      setIsShrunk(false);
      setIsInitialLoad(true);

      // transition 방지
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setIsInitialLoad(false);
    }
  }, [pathname]);

  return (
    <ShrunkContext.Provider value={{ isShrunk, setIsShrunk, isInitialLoad }}>
      {children}
    </ShrunkContext.Provider>
  );
};

export const useShrunk = () => {
  const context = useContext(ShrunkContext);
  if (context === undefined) {
    throw new Error('useShrunk must be used within a ShrunkProvider');
  }
  return context;
};
