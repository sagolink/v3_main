import { cn } from '@/lib/utils';

import MainBanner from './components/MainBanner';
import AppPreviews from './components/AppPreviews';
import SagolinkSteps from './components/SagolinkSteps';
import SagolinkBenefits from './components/SagolinkBenefits';
import SagolinkCategories from './components/SagolinkCategories';
import SagolinkYoutube from './components/SagolinkYoutube';
import SubBanner from './components/SubBanner';

export const metadata = {
  title: '사고링크',
  description: '보험금, 사고링크와 함께 쉽고 빠르게 잘 받자!',
  keywords: '사고링크, 보험금, 합의금, 교통사고, 질병사고, 일상사고',
  icons: {
    icon: '/sagolink-logo.svg', // SVG 파일 경로
  },
  openGraph: {
    title: '사고링크',
    description: '보험금 잘 받으려면 오직 사고링크',
    images: ['/sagolink.png'],
  },
};

export default function Home() {
  return (
    <div className={cn('relative flex flex-col items-center')}>
      <div className={cn('flex flex-col items-center h-full w-full')}>
        <MainBanner />
        <AppPreviews />
        <SagolinkSteps />
        <SagolinkBenefits />
        <SagolinkCategories />
        <SagolinkYoutube />
        <SubBanner />
      </div>
    </div>
  );
}
