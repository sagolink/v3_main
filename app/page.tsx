import Image from 'next/image';

export default function Home() {
  const test = { a: 1, b: 2 };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="bg-red-500 text-white p-4">테스트</div>
    </div>
  );
}
