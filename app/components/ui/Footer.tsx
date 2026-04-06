'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/hospitals/inquiry') return null;

  const socialIcons = [
    {
      src: '/footer/footer_youtube.svg',
      alt: 'footer_youtube',
      href: 'https://www.youtube.com/@sagolink',
    },
    {
      src: '/footer/footer_naver.svg',
      alt: 'footer_naver',
      href: 'https://m.blog.naver.com/PostList.naver?blogId=sagolink',
    },
    {
      src: '/footer/footer_insta.svg',
      alt: 'footer_insta',
      href: 'https://www.instagram.com/sagolink',
    },
  ];

  return (
    <div className="flex flex-col justify-between w-full h-fit items-center pt-12 pb-20 lg:pt-25 lg:pb-40 bg-gray-900">
      <div className="flex flex-col w-full max-w-160 lg:w-247 lg:max-w-247 space-y-5 lg:space-y-6 px-4 lg:px-0">
        <div className="w-full">
          <Image
            src={'/footer/footer_logo.svg'}
            width={173}
            height={40}
            className="h-6 lg:h-10 object-contain -ml-8 lg:ml-0"
            alt="footer_logo"
          />
        </div>
        <hr className="w-full  max-w-160 lg:w-247 lg:max-w-247 border-gray-800" />
        <div className="flex flex-col w-full max-w-160 lg:max-w-246">
          <div className="w-full h-fit space-y-1 lg:space-y-2">
            <div className="w-full h-fit flex lg:items-start lg:justify-between">
              <p className="text-white font-14-bold lg:text-[16px]">
                (주)사고링크
              </p>
              <div className="hidden w-fit lg:flex space-x-4">
                {socialIcons.map((icon, index) => (
                  <motion.div
                    key={index}
                    whileTap={{ opacity: 0.85, scale: 0.97 }}
                    onClick={() => window.open(icon.href)}
                    className={`size-10 flex items-center justify-center ${index < socialIcons.length - 1 ? 'mr-3 sm:mr-5' : ''}`}
                  >
                    <Image
                      src={icon.src}
                      width={40}
                      height={40}
                      alt={icon.alt}
                      className="cursor-pointer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <address className="not-italic">
              <div className="flex flex-row items-center font-14-medium lg:text-[16px] text-white space-x-2">
                <p className="">사업자등록번호 : 505-81-85139</p>
                <p className="w-[1px] h-3 lg:h-4 bg-gray-800 rounded-[4px] opacity-100"></p>
                <p className="">대표 : 송필재</p>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-2 lg:items-center">
                <div className="flex flex-row items-center font-14-medium lg:text-[16px] text-white space-x-2">
                  <p className="">
                    인천 연수구 센트럴로 263, 23층 인천관광기업지원센터 사고링크
                    (송도동,IBS타워)
                  </p>
                </div>
                <p className="hidden lg:block w-[1px] h-3 lg:h-4 bg-gray-800 rounded-[4px] opacity-100"></p>
                <div className="flex flex-row items-center font-14-medium lg:text-[16px] text-white space-x-2">
                  <a href="mailto:contact@sagolink.com">contact@sagolink.com</a>
                </div>
              </div>
            </address>
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center ">
            <div className="flex sm:items-center space-x-2 mt-5 lg:mt-6 font-14-medium lg:text-[16px] text-white">
              <motion.div
                onClick={() =>
                  window.open(
                    'https://sand-petroleum-c3f.notion.site/3a7cb2ba81e143a89f7c904507a1710f',
                  )
                }
                whileTap={{ opacity: 0.85, scale: 0.97 }}
                className=" cursor-pointer"
              >
                이용약관
              </motion.div>
              <p className="w-[1px] h-3 lg:h-4 bg-gray-800 rounded-[4px] opacity-100"></p>
              <motion.div
                onClick={() =>
                  window.open(
                    'https://sand-petroleum-c3f.notion.site/010ce5296de645f1ae6a8691afbe1bae?pvs=74',
                  )
                }
                whileTap={{ opacity: 0.85, scale: 0.97 }}
                className=" cursor-pointer"
              >
                개인정보처리방침
              </motion.div>
              <p className="w-[1px] h-3 lg:h-4 bg-gray-800 rounded-[4px] opacity-100"></p>
              <motion.div
                onClick={() =>
                  window.open(
                    'https://sand-petroleum-c3f.notion.site/70c8b474986544fba845bafc6ab18eb8',
                  )
                }
                whileTap={{ opacity: 0.85, scale: 0.97 }}
                className=" cursor-pointer"
              >
                위치기반서비스 이용약관
              </motion.div>
            </div>
            <div className="font-14-medium lg:text-[16px]  text-gray-500 mt-4">
              ⓒ 2025 SAGOLINK ALL RIGHT RESERVED.
            </div>
          </div>
          <div className="w-fit flex space-x-4 mt-5 lg:hidden">
            {socialIcons.map((icon, index) => (
              <motion.div
                key={index}
                whileTap={{ opacity: 0.85, scale: 0.97 }}
                onClick={() => window.open(icon.href)}
                className={`${index < socialIcons.length - 1 ? 'mr-3 sm:mr-5 z-10' : 'z-10'}`}
              >
                <Image
                  src={icon.src}
                  width={40}
                  height={40}
                  alt={icon.alt}
                  className="cursor-pointer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
