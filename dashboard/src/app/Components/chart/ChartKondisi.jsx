'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { useEffect, useState, useCallback } from 'react';

export default function ChartKondisi({ kondisiBerat, kondisiRingan, kondisiSedang }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const data = [
    {
      name: 'Risiko Tinggi',
      Pasien: kondisiBerat,
      color: '#EA4648',
    },
    {
      name: 'Risiko Sedang',
      Pasien: kondisiSedang,
      color: '#F77317',
    },
    {
      name: 'Risiko Rendah',
      Pasien: kondisiRingan,
      color: '#FFC94A',
    },
  ];
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="rounded-lg dark:dark border py-10 shadow-lg xl:w-full sm:w-[90%] max-sm:w-full h-[445px]">
      <h1 className="text-xl font-bold px-10 mb-5 text-[#5d87ff]">Kondisi Pasien</h1>
      <BarChart
        activeIndex={activeIndex}
        width={window.innerWidth >= 1024 ? 450 : window.innerWidth >= 768 ? 400 : 300}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        reverseStackOrder
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Pasien" onMouseEnter={onPieEnter} fill="color">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
