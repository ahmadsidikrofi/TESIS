'use client';

import ListMiniPasien from './Components/ListMiniPasien';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ChartGender from './Components/chart/ChartGender';
import ChartKondisi from './Components/chart/ChartKondisi';
import { User, SignIn, SignOut, Pulse } from '@phosphor-icons/react/dist/ssr';
import { useFlowbeatApi } from '@/context/ApiProvider';

const Home = () => {
  const { axios } = useFlowbeatApi();
  const [pasien, setPasien] = useState([]);
  const [totPasien, setTotPasien] = useState('');
  const [loading, setLoading] = useState(true);
  const [is_login, setIsLogin] = useState('');
  const [is_notLogin, setis_notLogin] = useState('');
  const [monitoring, setMonitoring] = useState('');
  const [genderPria, setGenderPria] = useState('');
  const [genderWanita, setGenderWanita] = useState('');
  const [kondisiRingan, setKondisiRingan] = useState('');
  const [kondisiSedang, setKondisiSedang] = useState('');
  const [kondisiBerat, setKondisiBerat] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('/patients')
        .then((response) => {
          setPasien(response.data);
          setTotPasien(response.data.length);
          setLoading(false);

          const loggedInPatients = response.data.filter((pasien) => pasien.is_login === '1');
          setIsLogin(loggedInPatients.length);

          const notLoggedInPatients = response.data.filter((pasien) => pasien.is_login === '0');
          setis_notLogin(notLoggedInPatients.length);
          const Monitoring = response.data.filter((pasien) => pasien.is_active === 'active');
          setMonitoring(Monitoring.length);
          const kelaminPria = response.data.filter((pasien) => pasien.jenis_kelamin === 'Pria');
          const kelaminWanita = response.data.filter((pasien) => pasien.jenis_kelamin === 'Wanita');
          setGenderPria(kelaminPria);
          setGenderWanita(kelaminWanita);

          if (response.data) {
            let ringanCount = 0;
            let sedangCount = 0;
            let beratCount = 0;

            response.data.forEach((item) => {
              const calcEws = Number(item.heartrate?.score || 0) + Number(item.oxygen_saturation?.score || 0) + Number(item.nibp?.score || 0) + Number(item.temperature?.score || 0);

              if (calcEws >= 1 && calcEws <= 3) {
                ringanCount++;
              } else if (calcEws >= 4 && calcEws <= 6) {
                sedangCount++;
              } else if (calcEws >= 7 && calcEws <= 10) {
                beratCount++;
              }
            });

            setKondisiRingan(ringanCount);
            setKondisiSedang(sedangCount);
            setKondisiBerat(beratCount);
          }
        })
        .catch((error) => {});
    };
    fetchData();
  }, [loading, totPasien, is_notLogin, is_login, kondisiBerat, kondisiSedang, kondisiRingan, genderWanita, genderPria, monitoring, axios]);

  return (
    <>
      <h1 className="mt-10 text-3xl font-bold dark:text-white text-[#5d87ff]">Dashboard</h1>
      <div className="flex flex-col gap-10  my-10">
        <div className="grid xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:w-3/4 max-sm:w-60 xl:w-full">
          <div className="flex sm:w-72 lg:w-full dark:bg-dark dark:shadow-sm dark:shadow-white gap-3 px-3 p-5 items-center h-full border-l-8 shadow-lg border-[#5d87ff] rounded-lg">
            <User className="w-12 h-12 bg-[#5d87ff] p-3 rounded-full" />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold 2xl:text-xl dark:text-white xl:text-md text-[#5d87ff]">Jumlah Pasien</h1>
              <h1 className="2xl:text-3xl xl:text-2xl font-bold">{totPasien}</h1>
            </div>
          </div>
          <div className="flex sm:w-72 lg:w-full dark:bg-dark dark:shadow-sm dark:shadow-white gap-3 px-3 p-5 items-center h-full border-l-8 shadow-lg border-[#5d87ff] rounded-lg">
            <SignIn className="w-12 h-12 bg-[#CFFF92] p-3 rounded-full" />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold 2xl:text-xl xl:text-md dark:text-white text-[#5d87ff]">Pasien Login</h1>
              <h1 className="2xl:text-3xl dark:text-white xl:text-2xl font-bold">{is_login}</h1>
            </div>
          </div>
          <div className="flex sm:w-72 lg:w-full dark:bg-dark dark:shadow-sm dark:shadow-white gap-3 px-3 p-5 items-center h-full border-l-8 shadow-lg border-[#5d87ff] rounded-lg">
            <SignOut className="w-12 h-12 bg-[#FF8484] p-3 rounded-full" />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold 2xl:text-xl xl:text-md dark:text-white text-[#5d87ff]">Pasien Logout</h1>
              <h1 className="2xl:text-3xl xl:text-2xl dark:text-white font-bold">{is_notLogin}</h1>
            </div>
          </div>
          <div className="flex sm:w-72 lg:w-full dark:bg-dark dark:shadow-sm dark:shadow-white gap-3 px-3 p-5 items-center h-full border-l-8 shadow-lg border-[#5d87ff] rounded-lg">
            <Pulse className="w-12 h-12 bg-[#D15DE3] p-3 rounded-full" />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold 2xl:text-xl xl:text-md dark:text-white text-[#5d87ff]">Pasien Active</h1>
              <h1 className="2xl:text-3xl xl:text-2xl dark:text-white font-bold">{monitoring}</h1>
            </div>
          </div>
        </div>
        <ListMiniPasien pasien={pasien} loading={loading} />
        <div className="grid sm:grid-cols-1 xl:grid-cols-2 sm:gap-3 max-sm:gap-3">
          <ChartGender genderPria={genderPria} genderWanita={genderWanita} />
          <ChartKondisi kondisiBerat={kondisiBerat} kondisiSedang={kondisiSedang} kondisiRingan={kondisiRingan} />
        </div>
      </div>
    </>
  );
};

export default Home;
