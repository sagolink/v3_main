'use client';

import { cn } from '@/lib/utils';

import { motion } from 'motion/react';
import Image from 'next/image';
import arrow from '@/public/common/lotties/arrow.json';
import LottieInView from './ui/LottieInView';

export default function AppPreviews() {
  return (
    <div
      className={cn(
        'flex flex-col justify-between items-center px-3 lg:px-0 py-25 lg:pt-50 lg:pb-25 w-full lg:w-[984px]',
      )}
    >
      <motion.div
        initial={{ opacity: 0.7, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="font-24-bold lg:text-[56px] font-extrabold text-center flex flex-col gap-7 lg:gap-8 items-center w-full"
      >
        <div className="w-6 lg:w-8 h-1 lg:h-[6px] bg-primary-600"></div>
        <div>
          <p>보험금, 어렵게 생각하지 마세요.</p>
          <p>AI가 1분 안에 예상 금액 알려드려요</p>
        </div>
      </motion.div>
      <div className="flex flex-col items-center w-full mt-16 lg:mt-30">
        {/** app 1 */}
        <motion.div
          initial={{ opacity: 0.7, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col-reverse lg:flex-row lg:gap-6 items-center lg:items-start lg:justify-between w-full"
        >
          <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start">
            <h3 className="font-20-bold lg:text-[36px] lg:leading-12 font-bold whitespace-pre-wrap text-center lg:text-left">
              {'1분 만에, \nAI 예상 보험금 알아보기'}
            </h3>
            <div className="font-14-medium lg:text-lg text-gray-500 lg:leading-8 whitespace-pre-wrap text-center lg:text-left">
              <p>간단하게 사고 내용 입력해서 예상 보상금 확인해 보세요.</p>
              <p>최신 데이터와 AI를 기반으로 신뢰도 높은 결과를 제공해요.</p>
              <p>어렵고 번거로운 보험금, 이제 사고링크에 맡기면 끝!</p>
            </div>
            <button
              onClick={() =>
                (window.location.href =
                  'https://sagolinkapp.onelink.me/vnCi/rsnutqpx')
              }
              className="font-14-bold border border-primary-600 text-primary-600 w-[243px] py-3 rounded-3xl cursor-pointer mt-[8px] lg:mt-6  hover:bg-accent flex justify-center items-center gap-1 mb-8"
            >
              <p>{'1분만에 내 예상 보상금 확인하기'}</p>
              <LottieInView
                animationData={arrow}
                className="size-4"
                loop={true}
              />
            </button>
          </div>
          <Image
            src={'/traffic/app1.png'}
            width={500}
            height={500}
            className="h-auto object-contain w-full  max-w-[328px] lg:max-w-[500px]  lg:w-auto mb-9 lg:mb-0"
            alt="app1"
          />
        </motion.div>

        {/** app 2 */}
        <div className="flex flex-col items-center w-full mt-15">
          <motion.div
            initial={{ opacity: 0.7, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col-reverse lg:flex-row lg:gap-6 items-center lg:items-start lg:justify-between w-full"
          >
            <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start">
              <h3 className="font-20-bold lg:text-[36px] lg:leading-12 font-bold whitespace-no-wrap lg:whitespace-pre-wrap  text-center lg:text-left w-[190px] lg:w-auto">
                {'더 빠르게, \n더 기분 좋게, \n더 잘 받을 수 있게'}
              </h3>
              <div className="font-14-medium lg:text-lg text-gray-500 lg:leading-8 whitespace-pre-wrap text-center lg:text-left">
                <p>보험사와 싸우지 말고 안심하고 사고링크에 맡기세요.</p>
                <p>
                  이제 보험사와 직접 상대하지 마세요.만족스러운 결과만 확<br />
                  인하세요. 시간 낭비, 감정 소모 없이 이제 보상도 제대로 받
                  <br />을 수 있어요.{' '}
                </p>
              </div>
              <button
                onClick={() =>
                  (window.location.href =
                    'https://sagolinkapp.onelink.me/vnCi/n7um53sd')
                }
                className="font-14-bold border border-primary-600 text-primary-600 w-[243px] py-3 rounded-3xl cursor-pointer mt-[8px] lg:mt-6 hover:bg-accent flex justify-center items-center gap-1"
              >
                <p>안심하고 예상 보상금 확인하기</p>
                <LottieInView
                  animationData={arrow}
                  className="size-4"
                  loop={true}
                />
              </button>
            </div>
            <Image
              src={'/traffic/app2.png'}
              width={500}
              height={500}
              className="h-auto object-contain w-full max-w-[328px] lg:max-w-[500px] lg:w-auto mb-9 lg:mb-0"
              alt="app2"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
