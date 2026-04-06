'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import LottieInView from './ui/LottieInView';
import arrow from '@/public/hospitals/lotties/arrowForButton.json';

export default function SagolinkBenefits() {
  const benefits = [
    {
      title: ['1원도 빠짐없이', '제대로 보상'],
      desciption: [
        '보험사의 부당한 보험금,',
        '이제 제대로 보상 받을 수 있어요',
      ],
      imgSrc: '/traffic/money.svg',
    },
    {
      title: ['고객 입장에서', '고객의 이익을'],
      desciption: ['언제나 고객 입장에서!', '보험사와 직접 싸울 필요 없어요'],
      imgSrc: '/traffic/customer.svg',
    },
    {
      title: ['업계 최저 수임료', '단 9%만'],
      desciption: [
        '업계 최저 9% 후불제 수수료,',
        '착수금 및 별도 비용 일체 없어요',
      ],
      imgSrc: '/traffic/commission.svg',
    },
  ];

  return (
    <div
      className={cn(
        'flex flex-col justify-between w-full items-center py-20 lg:py-50 bg-primary-50',
      )}
    >
      <div className="flex flex-col items-center w-[328px] lg:w-full">
        <motion.div
          initial={{ opacity: 0.7, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} // 20% 정도 보이면 실행
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full"
        >
          <div className="flex flex-col items-center gap-8 lg:gap-[46px] font-24-bold lg:text-[56px] lg:font-extrabold leading-9 lg:leading-16 font-bold whitespace-pre-wrap lg:whitespace-nowrap text-center">
            <div className="w-6 h-1 lg:w-8 lg:h-[6px] bg-primary-600"></div>
            {'사고링크에 맡기고\n‘잘’ 받으세요'}
          </div>
          <div className="flex justify-center items-center mt-12 w-full">
            <Button
              onClick={() =>
                (window.location.href =
                  'https://sagolinkapp.onelink.me/vnCi/f2apekbc')
              }
              variant="gradiant"
              size="xl"
              className="flex justify-center items-center w-full lg:w-[340px] lg:py-8 text-sm lg:text-lg"
            >
              1원도 빠짐없이 예상 보상금 확인하기
              <LottieInView
                animationData={arrow}
                className="size-4"
                loop={true}
              />
            </Button>
          </div>
        </motion.div>

        {/**혜택 소개 */}
        <motion.div
          initial={{ opacity: 0.7, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row gap-6"
        >
          {benefits &&
            benefits.map((benefit, index) => (
              <div
                key={`${benefit.title}-${index}`}
                className="flex flex-col mt-10 items-center"
              >
                <Image
                  src={benefit.imgSrc}
                  width={312}
                  height={312}
                  className="object-contain"
                  alt="icon"
                />
                <div className="flex gap-1 lg:flex-col lg:gap-0 font-20-bold lg:text-36 text-center mt-4 lg:mt-6">
                  <p>{benefit.title[0]}</p>
                  <p>{benefit.title[1]}</p>
                </div>
                <div className="text-sm lg:text-lg text-medium text-center text-gray-500 mt-4 lg:mt-6">
                  <p>{benefit.desciption[0]}</p>
                  <p>{benefit.desciption[1]}</p>
                </div>
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
