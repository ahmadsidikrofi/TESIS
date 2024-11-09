'use client';

import '@/app/globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { DarkTheme } from '../DarkTheme';
import { SmileyNervous } from '@phosphor-icons/react';
import { Gauge } from 'lucide-react';
import { Question, Note, Database } from '@phosphor-icons/react';
import Notif from '../Notif';
import MiniSideBar from '../MiniSideBar';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [active, setActive] = useState('');

  const handelActive = (menu) => {
    if (active !== menu) {
      setActive(menu);
    }
  };
  return (
    <>
      <div className="lg:flex xl:flex 2xl:flex md:flex sm:block max-sm:block">
        <div className={`sticky top-0 h-screen bg-transparent p-4 gap-4 shadow dark:shadow-[0_0_20px_-5px_rgba(253,247,255,0.3)] block sm:block md:block max-lg:flex lg:flex xl:flex 2xl:flex`}>
          <div className="flex flex-col justify-between h-full sm:w-20 max-sm:w-20 md:w-20 lg:w-[250px] xl:w-[250px] 2xl:w-[250px]">
            <div className="flex flex-col lg:gap-10 xl:gap-10 2xl:gap-10">
              <div className="mx-auto mt-5 gap-3 flex flex-col lg:p-2 lg:items-center lg:flex-row lg:justify-center xl:p-2 xl:items-center xl:flex-row xl:justify-center 2xl:p-2 2xl:items-center 2xl:flex-row 2xl:justify-center">
                <DarkTheme />
                <Notif />
              </div>
              <h1 className="text-2xl font-bold text-center text-[#5d87ff] dark:text-white hidden lg:block xl:block 2xl:block">Dashboard Jantung</h1>
              <div className="flex flex-col gap-2 max-sm:mt-5 sm:mt-5 md:mt-5 lg:mt-0 xl:mt-0 2xl:mt-0">
                <Link
                  href={'/'}
                  onClick={() => handelActive('dashboard')}
                  className={`flex justify-between cursor-pointer py-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400  dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear
                  ${active === 'dashboard' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex mx-auto lg:mx-0  gap-4 font-bold text-lg items-center">
                    <Gauge size={32} />
                    <p className="hidden lg:block">Dashboard</p>
                  </div>
                </Link>
                <Link
                  href={'/pasien'}
                  onClick={() => handelActive('pasien')}
                  className={`flex cursor-pointer text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'pasien' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex mx-auto lg:mx-0 gap-4 font-bold text-lg items-center">
                    <SmileyNervous size={32} />
                    <p className="hidden lg:block">Pasien</p>
                  </div>
                </Link>
                <Link
                  href={'/notes'}
                  onClick={() => handelActive('notes')}
                  className={`flex justify-between cursor-pointer gap-4  text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'notes' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex mx-auto lg:mx-0 gap-4 font-bold text-lg items-center">
                    <Note size={32} />
                    <p className="hidden lg:block">Notes</p>
                  </div>
                </Link>
                <Link
                  href={'/faq'}
                  onClick={() => handelActive('faq')}
                  className={`flex cursor-pointer text-lg items-center  rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'faq' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex mx-auto lg:mx-0 gap-4 font-bold text-lg items-center">
                    <Question size={32} />
                    <p className="hidden lg:block">FAQ</p>
                  </div>
                </Link>
                <Link
                  href={'/masterdata'}
                  onClick={() => handelActive('master')}
                  className={`flex mx-auto lg:mx-0 justify-between cursor-pointer gap-4  text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'master' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex gap-4 font-bold text-lg items-center">
                    <Database size={32} />
                    <p className="hidden lg:block">Master Data</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MiniSideBar /> */}
    </>
  );
};
export default Sidebar;
