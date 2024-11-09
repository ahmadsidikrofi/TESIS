'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell, BellRinging } from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Clock, CaretDown, CaretUp } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useFlowbeatApi } from '@/context/ApiProvider';

const Notif = () => {
  const { axios } = useFlowbeatApi();
  const [notif, setNotif] = useState([]);
  const [jumlah, setJumlah] = useState(0);
  const [pasien, setPasien] = useState([]);
  const [selectedPasien, setSelectedPasien] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('/patients')
        .then((response) => {
          setPasien(response?.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    const dataNotif = async () => {
      await axios.get('/notifications').then((res) => {
        // await axios.get('http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/notifications').then((res) => {
        setNotif(res.data);
        // setJumlah(res.data.length);
        setJumlah(res.data.flat().length);
      });
    };

    fetchData();
    dataNotif();
  }, [axios]);

  const handleSortNotif = (nama_lengkap) => {
    setSelectedPasien(nama_lengkap);
  };
  const filteredNotif = selectedPasien ? notif.filter((group) => group.some((item) => item.nama_lengkap === selectedPasien)) : notif;
  return (
    <Sheet>
      {jumlah === 12 ? (
        <SheetTrigger>
          <Bell className="cursor-pointer pt-1" size={23} />
        </SheetTrigger>
      ) : (
        <SheetTrigger asChild className="text-center p-2 rounded-lg">
          <Button variant='outline' size='icon'>
            <BellRinging className='text-[#5d87ff] dark:text-white' size={23} />
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="text-2xl my-5">Notifikasi</SheetTitle>
          <div>
            <button className="flex gap-3">
              {dropdownOpen ? (
                <>
                  <div>
                    <div className="grid grid-cols-2 gap-3">
                      {pasien.map((item, i) => (
                        <div key={i} className="w-[150px] border rounded-[15px] font-bold text-lg">
                          <Button onClick={() => handleSortNotif(item.nama_lengkap)} variant="ghost" className="w-[100px] p-3">
                            {item.nama_lengkap.length > 10 ? item.nama_lengkap.slice(0, 10) + '...' : item.nama_lengkap}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <button className="mt-5" onClick={() => setDropdownOpen(false)}>
                      <CaretUp className="hover:cursor-pointer hover:text-[#5d87ff]" size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 mb-2">
                  <div className="flex gap-3">
                    {pasien.slice(0, 2).map((item, i) => (
                      <div key={i} className="w-[150px] border rounded-[15px] font-bold text-lg">
                        <Button onClick={() => handleSortNotif(item.nama_lengkap)} variant="ghost" className="w-[100px] p-3">
                          {item.nama_lengkap.length > 10 ? item.nama_lengkap.slice(0, 10) + '...' : item.nama_lengkap}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 mx-auto" onClick={() => setDropdownOpen(true)}>
                    <CaretDown className="hover:cursor-pointer hover:text-[#5d87ff]" size={20} />
                  </button>
                </div>
              )}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {filteredNotif.map((group, index) => (
              <div className="flex flex-col gap-3" key={index}>
                {group.slice(0, 12).map((item, index2) => {
                  if (item.total_score >= 5 && item.total_score < 7) {
                    return (
                      <SheetDescription key={index2} className="text-black dark:text-white py-5 h-60 border-l-[13px] border-orange-500 rounded-lg shadow-lg px-5">
                        <p className="font-bold text-lg">{item.nama_lengkap}</p>
                        <p className="font-lg mt-1">Total Score {item.total_score}</p>
                        <p className="text  mt-5">Lakukan eskalasi perawatan dan frekuensi monitoring tiap jam. Pertimbangkan eskalasi perawatan ke unit intensif care edukasi keluarga pasien</p>
                        <p className="mt-5 flex gap-1 justify-end w-full relative bottom-2 items-center text-sm font-bold ">
                          <Clock className="" size={22} />
                          <p className="">{item.created_at}</p>
                        </p>
                      </SheetDescription>
                    );
                  } else if (item.total_score >= 0 && item.total_score <= 4) {
                    return (
                      <SheetDescription key={index2} className="text-black dark:text-white py-5 h-60 border-l-[13px] border-yellow-400 rounded-lg shadow-lg px-5">
                        <p className="font-bold text-2xl">{item.nama_lengkap}</p>
                        <p className="font-lg mt-1">Total Score {item.total_score}</p>
                        <p className="text  mt-5">Assessmen dilakukan oleh perawat senior (maks respon 5 menit) dengan eskalasi perawatan monitoring per 4-6 jam</p>
                        <p className="mt-5 flex gap-1 justify-end w-full relative top-2 items-center text-sm font-bold ">
                          <Clock className="" size={22} />
                          <p className="">{item.created_at}</p>
                        </p>
                      </SheetDescription>
                    );
                  } else if (item.total_score >= 7 && item.total_score <= 9) {
                    return (
                      <SheetDescription key={index2} className="text-black dark:text-white py-5 h-60 border-l-[13px] border-red-500 rounded-lg shadow-lg px-5">
                        <p className="font-bold text-2xl">{item.nama_lengkap}</p>
                        <p className="font-lg mt-1">Total Score {item.total_score}</p>
                        <p className="text  mt-5">Respon maksimal 10 menit beri informasi ke DPJP dan edukasi keluarga pasien</p>
                        <p className="mt-5 flex gap-1 justify-end w-full relative top-7 items-center text-sm font-bold ">
                          <Clock className="" size={22} />
                          <p className="">{item.created_at}</p>
                        </p>
                      </SheetDescription>
                    );
                  } else {
                    return (
                      <SheetDescription key={index2} className="text-black dark:text-white py-5 h-60 border-l-[13px] border-[#0ea5e9] rounded-lg shadow-lg px-5">
                        <p className="font-bold text-2xl">{item.nama_lengkap}</p>
                        <p className="font-lg mt-1">Total Score {item.total_score}</p>
                        <p className="text  mt-5">Assessmen dilakukan oleh perawat senior (maks respon 5 menit) dengan eskalasi perawatan monitoring per 4-6 jam</p>
                        <p className="mt-5 flex gap-1 justify-end w-full relative top-2 items-center text-sm font-bold ">
                          <Clock className="" size={22} />
                          <p className="">{item.created_at}</p>
                        </p>
                      </SheetDescription>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default Notif;
