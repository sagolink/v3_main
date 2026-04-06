'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function SagolinkYoutube() {
  return (
    <div
      className={cn(
        'flex flex-col justify-between w-full items-center py-20 lg:py-50 bg-[#292B34]',
      )}
    >
      <div className="flex flex-col lg:w-[984px]">
        <motion.div
          initial={{ opacity: 0.7, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} // 20% 정도 보이면 실행
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-white text-2xl lg:text-4xl sm:leading-14 font-bold whitespace-pre-wrap text-center text-left w-full max-w-[328px] lg:max-w-full m-auto"
        >
          {'내 보험사보다\n내 편에서 도와주는 사고링크'}
        </motion.div>

        <div className="flex-col mt-10 flex max-w-[328px] lg:max-w-full  sm:text-left w-full m-auto">
          <motion.div
            initial={{ opacity: 0.7, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // 20% 정도 보이면 실행
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-white font-14-medium lg:text-[20px]"
          >
            {'보험금은 객관적인 사고 유형과 피해 내용이 아닌,'}
          </motion.div>

          <motion.div
            className="flex flex-row"
            initial={{ opacity: 0.7, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // 20% 정도 보이면 실행
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="text-white font-14-medium lg:text-[20px]">
              {'고객 분들의 성향과 보험 지식 수준에 따라'}
              <span className="text-[#7F98F8] font-14-medium lg:text-[20px] mx-1">
                {'불합리하게'}
              </span>
              {'결정되곤 합니다.'}
            </div>
          </motion.div>
          <motion.div
            className="flex flex-row mt-6"
            initial={{ opacity: 0.7, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // 20% 정도 보이면 실행
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="flex flex-col">
              <div className="text-white font-14-medium lg:text-[20px]">
                {'사고링크에서는 모두가 제대로 된 보상을 받을 수 있도록,'}
              </div>
              <div className="text-white font-14-medium  lg:text-[20px]">
                {'고객 분들의'}
                <span className="text-[#7F98F8] font-14-medium lg:text-[20px] ml-1">
                  올바른 권리 보호
                </span>
                {'를 위해 노력하고 있습니다.'}
              </div>
            </div>
          </motion.div>
        </div>

        {/** 유투브 */}
        <div className="flex lg:flex-col mt-16  max-w-[328px] lg:max-w-full  lg:h-[704px]">
          <div className="w-full flex flex-col  justify-between items-center gap-y-4 lg:gap-y-14 ">
            <div className="flex flex-col gap-[56px] lg:flex-row w-full lg:gap-x-6 ">
              {/** youtube 1 */}
              <section className="flex flex-col w-full gap-3 items-center">
                <div className="w-full aspect-video rounded-3xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/BK4QoNTOHk0" // 여기에 원하는 영상 URL
                    title="SagolinkYoutube1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-gray-500 text-sm lg:text-[20px] font-medium mt-2">
                  {'교통사고 보상금, 골절이면 얼마나 받을까?'}
                </h3>
              </section>
              {/** youtube 2 */}
              <section className="flex flex-col w-full  gap-3  items-center ">
                <div className="w-full aspect-video rounded-3xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/rH-du8ov9YM" // 여기에 원하는 영상 URL
                    title="SagolinkYoutube2"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-gray-500 text-sm lg:text-[20px] font-medium mt-2">
                  {'일상 속 사고, 내 보험 없어도 보상받을 수 있다?'}
                </h3>
              </section>
            </div>
            <div className="flex flex-col gap-y-[56px] lg:flex-row  w-full lg:gap-x-6">
              {/** youtube 3 */}
              <section className="flex flex-col w-full gap-3  items-center mt-11 lg:mt-0">
                <div className="w-full aspect-video rounded-3xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/TB1DkngfiOQ" // 여기에 원하는 영상 URL
                    title="SagolinkYoutube3"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-gray-500 text-sm lg:text-[20px] font-medium mt-2">
                  {'보험사가 질병 보험금 지급을 거부하는 이유?'}
                </h3>
              </section>
              {/** youtube 4 */}
              <section className="flex flex-col  w-full gap-3  items-center">
                <div className="w-full aspect-video rounded-3xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/VGFHUGCIoZI" // 여기에 원하는 영상 URL
                    title="SagolinkYoutube4"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-gray-500 text-sm lg:text-[20px] font-medium mt-2">
                  {'보험사 직원이 이런 말을 한다면?'}
                </h3>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
