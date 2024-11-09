'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useFlowbeatApi } from '@/context/ApiProvider';
import { Button } from '@/components/ui/button';
const Notes = () => {
  const { axios } = useFlowbeatApi();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeleton = <Skeleton className="w-[50px] h-[20px] rounded-full dark:bg-slate-200" />;

  useEffect(() => {
    const dataUser = async () => {
      await axios
        .get(`/patients`)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            setUser(response.data);
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    };
    dataUser();
  }, [axios]);
  return (
    <div className="flex flex-col mx-3 ">
      <h1 className="mt-10 text-3xl text-[#5d87ff] dark:text-white font-bold">Notes Pasien</h1>
      <div className="my-10 border rounded-lg p-3">
        <Table>
          <TableHeader>
            <TableRow className="max-sm:text-[12px]">
              <TableHead className="md:px-16 py-2">MRN</TableHead>
              <TableHead className="md:px-16 py-2 text-nowrap">Nama Pasien</TableHead>
              <TableHead className="md:px-16 py-2">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
              </TableRow>
            ) : (
              user.map((item, index) => (
                <TableRow className="text-left max-sm:text-[12px]" key={index}>
                  <TableCell className="text-center md:px-16 py-2">{index + 1}</TableCell>
                  <TableCell className="md:px-16 py-2">{item.nama_lengkap}</TableCell>
                  <TableCell className="md:px-16 py-2">
                    <Button variant="outline">
                      <Link className="text-[#5d87ff] dark:text-white" href={`/notes/${item.slug}`}>
                        <CaretRight size={25} />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Notes;
