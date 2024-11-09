'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from '../Components/Dropdown';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ArrowDown, ArrowUpDown, Route, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SearchInput from '../Components/SearchInput';
import { useFlowbeatApi } from '@/context/ApiProvider';

const Pasien = () => {
  const { axios } = useFlowbeatApi();
  const router = useRouter();
  const [pasien, setPasien] = useState([]);
  const [filteredPasien, setFilteredPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeleton = <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  const [sortPerawatan, setSortPerawatan] = useState(false);
  const [sortStatus, setSortStatus] = useState(false);
  const [sortTotalEws, setSortTotalEws] = useState(false);
  const [dropdown, setDropdown] = useState({
    pasien: false,
  });

  let redColor = 'bg-red-500';
  let yellowColor = 'bg-yellow-400';
  let orangeColor = 'bg-orange-500';
  let noData = 'bg-slate-300';

  const { toast } = useToast();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('/patients')
        // .get('http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/patients')
        .then((response) => {
          setPasien(response?.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };
    fetchData()
  }, [axios, setPasien, setLoading]);

  const handleSearch = (keyword) => {
    setFilteredPasien(pasien.filter((item) => item.nama_lengkap.toLowerCase().includes(keyword.toLowerCase())));
  };

  const handleDropdown = (ewsPatient) => {
    setDropdown((prevState) => ({
      ...prevState,
      [ewsPatient]: !prevState[ewsPatient],
    }));
  };

  const ubahPerawatan = async (slug, jenisPerawatanBaru) => {
    if (typeof window !== 'undefined') {
      axios
        .put(`https://flowbeat.web.id/api/patient/${slug}/profile`, {
          perawatan: jenisPerawatanBaru,
        })
        .then(() => {
          const updatePerawatan = pasien.map((item) => {
            if (item.slug === slug) {
              return {
                ...item,
                perawatan: jenisPerawatanBaru,
              };
            }
            return item;
          });
          setPasien(updatePerawatan);
          setFilteredPasien(updatePerawatan);
          toast({
            title: 'Ubah Perawatan',
            description: 'Jenis perawatan berhasil diubah',
          });
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: 'Ubah Perawatan',
            description: 'Jenis perawatan yang sama tidak dapat diubah',
            action: <ToastAction altText="Coba lagi">Coba lagi</ToastAction>,
          });
        });
    }
  };
  const ubahStatus = async (slug, statusBaru) => {
    if (typeof window !== 'undefined') {
      axios
        .put(`https://flowbeat.web.id/api/patient/${slug}/profile`, {
          is_active: statusBaru,
        })
        .then(() => {
          const updateStatus = pasien.map((item) => {
            if (item.slug === slug) {
              return {
                ...item,
                is_active: statusBaru,
              };
            }
            return item;
          });
          setPasien(updateStatus);
          setFilteredPasien(updateStatus);
          toast({
            title: 'Ubah Status',
            description: 'Status Berhasil Diubah',
          });
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: 'Ubah Status',
            description: 'Status yang sama tidak dapat diubah',
            action: <ToastAction altText="Coba lagi">Coba lagi</ToastAction>,
          });
        });
    }
  };

  const DropdownPerawatan = ({ item }) => {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{item.perawatan}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={item.perawatan} onValueChange={(val) => ubahPerawatan(item.slug, val)}>
              <DropdownMenuRadioItem value="Rawat inap">Rawat inap</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Rawat jalan">Rawat jalan</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };
  const DropdownStatus = ({ item }) => {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{item.is_active}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={item.is_active} onValueChange={(val) => ubahStatus(item.slug, val)}>
              <DropdownMenuRadioItem value="active">active</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="inactive">inactive</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const handleSortPerawatan = () => {
    if (!sortPerawatan) {
      const sortedPasienAsc = [...pasien].sort((a, b) => {
        if (a.perawatan < b.perawatan) return -1;
        if (a.perawatan > b.perawatan) return 1;
        return 0;
      });
      setPasien(sortedPasienAsc);
      setFilteredPasien(sortedPasienAsc);
      setSortPerawatan(true);
    } else {
      // Lakukan sorting secara descending
      const sortedPasienDesc = [...pasien].sort((a, b) => {
        if (a.perawatan > b.perawatan) return -1;
        if (a.perawatan < b.perawatan) return 1;
        return 0;
      });
      setPasien(sortedPasienDesc);
      setFilteredPasien(sortedPasienDesc);
      setSortPerawatan(false);
    }
  };
  const handleSortStatus = () => {
    if (!sortStatus) {
      const sortedPasienAsc = [...pasien].sort((a, b) => {
        if (a.is_active < b.is_active) return -1;
        if (a.is_active > b.is_active) return 1;
        return 0;
      });
      setPasien(sortedPasienAsc);
      setFilteredPasien(sortedPasienAsc);
      setSortStatus(true);
    } else {
      // Lakukan sorting secara descending
      const sortedPasienDesc = [...pasien].sort((a, b) => {
        if (a.is_active > b.is_active) return -1;
        if (a.is_active < b.is_active) return 1;
        return 0;
      });
      setPasien(sortedPasienDesc);
      setFilteredPasien(sortedPasienDesc);
      setSortStatus(false);
    }
  };

  const handleSortEWS = () => {
    if (!sortTotalEws) {
      const sortedPasien = pasien.slice().sort((a, b) => {
        const calcEwsA = Number(a.heartrate?.score || 0) + Number(a.oxygen_saturation?.score || 0) + Number(a.nibp?.score || 0);
        const calcEwsB = Number(b.heartrate?.score || 0) + Number(b.oxygen_saturation?.score || 0) + Number(b.nibp?.score || 0);
        return calcEwsB - calcEwsA;
      });
      setPasien(sortedPasien);
      setFilteredPasien(sortedPasien);
      setSortTotalEws(true);
    } else {
      const sortedPasien = pasien.slice().sort((b, a) => {
        const calcEwsA = Number(a.heartrate?.score || 0) + Number(a.oxygen_saturation?.score || 0) + Number(a.nibp?.score || 0);
        const calcEwsB = Number(b.heartrate?.score || 0) + Number(b.oxygen_saturation?.score || 0) + Number(b.nibp?.score || 0);
        return calcEwsB - calcEwsA;
      });
      setPasien(sortedPasien);
      setFilteredPasien(sortedPasien);
      setSortTotalEws(false);
    }
  };

  return (
    <div className="flex flex-col w-full mx-4">
      <h1 className="mt-10 text-3xl text-[#5d87ff] font-bold">Daftar Pasien</h1>
      <div className="mt-10">
        <SearchInput onSearch={handleSearch} />
        <Table className="w-full flex flex-col gap-5">
          <TableHeader className="w-full flex">
            <TableRow>
              <TableHead className="text-center">MRN</TableHead>
              <TableHead className="text-center xl:w-[260px] 2xl:w-[490px]">Nama Pasien</TableHead>
              <TableHead className="text-center xl:w-[80px] 2xl:w-[180px]">
                <Button variant="ghost" onClick={handleSortPerawatan}>
                  <ArrowUpDown size={18} /> Perawatan
                </Button>
              </TableHead>
              <TableHead className="text-center xl:w-[100px] 2xl:w-[170px]">EWS</TableHead>
              <TableHead className="text-center xl:w-[70px] 2xl:w-[150px]">
                <Button variant="ghost" onClick={handleSortEWS}>
                  <ArrowUpDown size={18} /> Total EWS
                </Button>
              </TableHead>
              <TableHead className="text-center xl:w-[100px] 2xl:w-[150px] ">
                <Button variant="ghost" className="" onClick={handleSortStatus}>
                  <ArrowUpDown size={18} /> Status
                </Button>
              </TableHead>
              <TableHead className="text-center ">Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>{skeleton} </TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
              </TableRow>
            ) : filteredPasien.length > 0 ? (
              filteredPasien.map((item, i) => {
                const calcEws = Number(item.heartrate?.score || 0) + Number(item.oxygen_saturation?.score || 0) + Number(item.temperature?.score || 0);
                let cellColor = noData;
                if (calcEws >= 1 && calcEws <= 4) {
                  cellColor = yellowColor;
                } else if (calcEws >= 5 && calcEws < 7) {
                  cellColor = orangeColor;
                } else if (calcEws >= 7 && calcEws <= 9) {
                  cellColor = redColor;
                } else {
                  cellColor;
                }
                return (
                  <TableRow className="text-center flex" key={i}>
                    <TableCell className="text-center w-[65px] ">{i + 1}</TableCell>
                    <TableCell className="items-center text-center 2xl:w-[488px] xl:w-[260px]">{item.nama_lengkap}</TableCell>
                    <TableCell className="text-center xl:w-[157px] 2xl:w-[180px]">
                      <DropdownPerawatan item={item} />
                    </TableCell>
                    <TableCell className="text-center xl:w-[100px] 2xl:w-[170px]" onClick={() => handleDropdown(item.id)}>
                      {dropdown[item.id] ? (
                        <>
                          <Dropdown patient={item} />
                        </>
                      ) : (
                        <Button className="xl:-mx-5" variant="ghost">
                          HR: {item.heartrate?.heart_beats} <ArrowDown size={14} />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className={`text-center ml-[55px] mr-[50px] ${cellColor} w-12`}>
                      <p className="text-center mt-3">{calcEws}</p>
                    </TableCell>
                    <TableCell className=" items-center text-center xl:w-[125px] 2xl:w-[150px]">
                      <DropdownStatus item={item} />
                    </TableCell>
                    <TableCell>
                      <button onClick={() => router.push(`/detail/${item.slug}`)} className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100">
                        <ChevronRightIcon className="h-4 w-4" color="#000" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              pasien.map((item, i) => {
                const calcEws = Number(item.heartrate?.score || 0) + Number(item.oxygen_saturation?.score || 0) + Number(item.nibp?.score || 0) + Number(item.temperature?.score || 0);
                let cellColor = noData;
                if (calcEws >= 1 && calcEws <= 4) {
                  cellColor = yellowColor;
                } else if (calcEws >= 5 && calcEws < 7) {
                  cellColor = orangeColor;
                } else if (calcEws >= 7 && calcEws <= 9) {
                  cellColor = redColor;
                } else {
                  cellColor;
                }
                return (
                  <TableRow className="text-center flex" key={i}>
                    <TableCell className="text-center mt-2 w-[65px] ">{i + 1}</TableCell>
                    <TableCell className="text-center mt-2 2xl:w-[488px] xl:w-[260px]">{item.nama_lengkap}</TableCell>
                    <TableCell className="text-center xl:w-[157px] 2xl:w-[180px]">
                      <DropdownPerawatan item={item} />
                    </TableCell>
                    <TableCell className="text-center xl:w-[100px] 2xl:w-[170px]" onClick={() => handleDropdown(item.id)}>
                      {dropdown[item.id] ? (
                        <>
                          <Dropdown patient={item} />
                        </>
                      ) : (
                        <Button className="xl:-mx-5" variant="ghost">
                          HR: {item.heartrate?.heart_beats} <ArrowDown size={14} />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className={`text-center ml-[55px] mr-[50px] ${cellColor} w-12`}>
                      <p className="text-center dark:text-black mt-3">{calcEws}</p>
                    </TableCell>
                    <TableCell className=" items-center text-center xl:w-[125px] 2xl:w-[150px]">
                      <DropdownStatus item={item} />
                    </TableCell>
                    <TableCell>
                      <button onClick={() => router.push(`/detail/${item.slug}`)} className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100">
                        <ChevronRightIcon className="h-4 w-4" color="#000" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Pasien;
