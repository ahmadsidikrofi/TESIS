'use client';

import axios from 'axios';
import ChartOxygen from '@/app/Components/chart/ChartOxygen';
import { useEffect, useState } from 'react';
import NewChartJantung from '@/app/Components/chart/NewChartJantung';
import { useRouter } from 'next/navigation';
import { ArrowCircleLeft, UserCircle } from '@phosphor-icons/react';
import ChartSuhu from '@/app/Components/chart/ChartSuhu';
import ChartNibp from '@/app/Components/chart/ChartNibp';

const Detail = ({ params: { slug } }) => {
  const router = useRouter();
  const [datas, setDatas] = useState({});
  const fetchData = async () => {
    if (typeof window !== 'undefined') {
      axios.get(`https://flowbeat.web.id/api/patient/${slug}`).then((response) => {
        setDatas(response.data);
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-16 px-10 flex flex-col 2xl:w-[1370px]">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push(`/pasien`)}>
          <ArrowCircleLeft size={40} />
        </button>
        <h1 className="text-3xl text-[#5d87ff] dark:text-white font-bold">Detail Pasien</h1>
      </div>
      <div className="justify-center flex">
        <div className="flex gap-10 my-5 mt-10 w-[900px] 2xl:w-[1000px] light:border bg-white dark:bg-black p-5 px-10 py-8 rounded-lg shadow-lg">
          <UserCircle size={90} />
          <div className="flex flex-col gap-2">
            <h1 className="text-md">
              <span className="font-bold">Nama : </span>
              {datas.nama_lengkap === null ? '-' : datas.nama_lengkap}
            </h1>
            <h1 className="text-md">
              <span className="font-bold">No. Hp : </span> {datas.noHp === null ? '-' : datas.noHp}
            </h1>
            <h1 className="text-md">
              <span className="font-bold">Tanggal Lahir : </span> {datas.tgl_lahir === null ? '-' : datas.tgl_lahir}
            </h1>
            <h1 className="text-md">
              <span className="font-bold">Alamat : </span> {datas.alamat === null ? '-' : datas.alamat}
            </h1>
            <h1 className="text-md">
              <span className="font-bold">Jenis Kelamin : </span> {datas.jenis_kelamin === null ? '-' : datas.jenis_kelamin}
            </h1>
            <h1 className="text-md">
              <span className="font-bold">Perawatan : </span> {datas.perawatan === null ? '-' : datas.perawatan}
            </h1>
          </div>
        </div>
      </div>

      <h1 className="text-3xl text-[#5d87ff] dark:text-white font-bold text-center mt-10">Monitoring Pasien</h1>
      <div className="flex flex-col lg:flex max-sm:block items-center lg:gap-5">
        <NewChartJantung slug={datas.slug} />
        <ChartOxygen slug={datas.slug} />
        <ChartSuhu slug={datas.slug} />
      </div>
    </div>
  );
};

export default Detail;
