'use client';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

interface LottieInViewProps {
  animationData: unknown;
  className: string;
  loop: boolean;
}
const LottieInView: React.FC<LottieInViewProps> = ({
  animationData,
  loop,
  className,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: '0px 0px',
  });

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect((): void => {
    if (inView) {
      lottieRef.current?.play();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={loop}
        className={className}
      />
    </div>
  );
};

export default React.memo(LottieInView);
