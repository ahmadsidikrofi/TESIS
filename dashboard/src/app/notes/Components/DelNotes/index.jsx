'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Trash } from '@phosphor-icons/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useFlowbeatApi } from '@/context/ApiProvider';
import { useEffect, useState } from 'react';

const DelNotes = ({ id, handleDelete }) => {
  const { axios } = useFlowbeatApi();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const hapusData = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`/note/${id}`);
    if (res.data.success) {
      handleDelete(id);
      toast({
        title: 'Notes Terhapus',
        description: 'Notes berhasil Terhapus',
      });
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-rose-500 h-8 items-center text-center justify-center rounded-lg p-1">
          <Trash size={22} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>Data yang di hapus tidak dapat dikembalikan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => hapusData(e)}>Setuju</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default DelNotes;

// <button onClick={hapusData} className="bg-rose-500 h-8 items-center text-center justify-center rounded-lg p-1">
//   <Trash size={22} />
// </button>
