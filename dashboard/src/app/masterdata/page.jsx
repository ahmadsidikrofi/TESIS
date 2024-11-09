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

const MasterData = () => {
  const router = useRouter();
  const [pasien, setPasien] = useState([]);
  const [filteredPasien, setFilteredPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeleton = <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  const [dropdown, setDropdown] = useState({
    pasien: false,
  });
  const handleSearch = (keyword) => {
    const filtered = pasien.filter((item) => item.nama_lengkap.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredPasien(filtered);
  };
  const fetchData = async () => {
    await axios
      .get('https://flowbeat.web.id/api/patients')
      .then((response) => {
        setPasien(response?.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="ml-2 mt-10 text-3xl text-[#5d87ff] font-bold">Master Data</h1>
      <div className="border-[1px] p-10 border-slate-200 dark:border-slate-800 rounded-lg my-10 mx-6">
        <SearchInput onSearch={handleSearch} />
        <Table className="w-max flex flex-col gap-5 mt-10">
          <TableHeader className="w-max flex">
            <TableRow>
              <TableHead className="w-[70px] text-center">MRN</TableHead>
              <TableHead className="text-center w-[200px]">Nama Pasien</TableHead>
              <TableHead className="text-center w-[140px]">No Handphone</TableHead>
              <TableHead className="text-center w-[220px]">Alamat</TableHead>
              <TableHead className="text-center w-[150px]">Tanggal Lahir</TableHead>
              <TableHead className="text-center w-[100px]">Jenis Kelamin</TableHead>
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
                return (
                  <TableRow className="text-center flex" key={i}>
                    <TableCell className="text-center py-10 w-[70px]">{i + 1}</TableCell>
                    <TableCell className="text-center py-10 w-[200px]">{item.nama_lengkap}</TableCell>
                    <TableCell className="text-center py-10 w-[140px]">{item.noHp}</TableCell>
                    <TableCell className="text-center py-10 justify-center w-[220px] h-[100px]">{item.alamat === null ? '-' : item.alamat}</TableCell>
                    <TableCell className="text-center py-10 w-[150px]">{item.tgl_lahir === null ? '-' : item.tgl_lahir}</TableCell>
                    <TableCell className="w-[100px] py-10 text-center">{item.jenis_kelamin === null ? '-' : item.jenis_kelamin}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              pasien.map((item, i) => {
                return (
                  <TableRow className="text-center flex" key={i}>
                    <TableCell className="text-center py-10 w-[70px]">{i + 1}</TableCell>
                    <TableCell className="text-center py-10 w-[200px]">{item.nama_lengkap}</TableCell>
                    <TableCell className="text-center py-10 w-[140px]">{item.noHp}</TableCell>
                    <TableCell className="text-center py-auto w-[220px] h-[100px]">{item.alamat === null ? <p className="py-6">-</p> : item.alamat}</TableCell>
                    <TableCell className="text-center py-10 w-[150px]">{item.tgl_lahir === null ? '-' : item.tgl_lahir}</TableCell>
                    <TableCell className="w-[100px] py-10 text-center">{item.jenis_kelamin === null ? '-' : item.jenis_kelamin}</TableCell>
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
export default MasterData;

// {item.alamat && item.alamat.length > 10 ? item.alamat.slice(0, 10) + '...' : item.alamat}</TableCell>
