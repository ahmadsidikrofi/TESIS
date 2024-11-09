'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartGender = ({ genderPria, genderWanita }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const data = [
    { name: 'Pria', value: genderPria.length, color: '#121481' },
    { name: 'Wanita', value: genderWanita.length, color: '#E524BD' },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="rounded-lg border shadow-lg dark:bg-dark sm:w-[90%] max-sm:w-full">
      <h1 className="text-xl mt-10 font-bold px-10 mb-5 dark:text-white text-[#5d87ff]">Jenis Kelamin</h1>
      <PieChart width={window.innerWidth <= 640 ? 300 : 500} height={340} className="-mt-[90px]">
        <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={80} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex flex-col gap-2 px-12 mb-[50px]">
        <div className="flex gap-3 items-center">
          <div className="bg-[#121481] rounded-full w-[15px] h-[15px]"></div>
          <h1 className="font-bold ">Pria</h1>
        </div>
        <div className="flex gap-3 items-center">
          <div className="bg-[#E524BD] rounded-full w-[15px] h-[15px]"></div>
          <h1 className="font-bold">Wanita</h1>
        </div>
      </div>
    </div>
  );
};

export default ChartGender;
