'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function NewChartJantung({ slug }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`https://flowbeat.web.id/api/oxymeter-patient/${slug}`);
    const formattedData = res.data.map((item) => ({
      ...item,
      created_at: new Date(item.created_at).toLocaleString(),
    }));
    setData(formattedData);
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [slug]);

  const maxBloodOxygen = Math.max(...data.map((item) => item.blood_oxygen));
  return (
    <div className="mt-10 dark:text-white dark:bg-black text-[#5d87ff] rounded-lg shadow p-5 px-10 py-10">
      <h1 className="text-xl mb-5 font-bold">Grafik SpO2</h1>
      <LineChart
        width={810}
        height={350}
        data={data}
        margin={{
          top: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} />
        <XAxis dataKey="created_at" tick={{ fill: '#959595' }} className="text-[13px]" />
        <YAxis dataKey="blood_oxygen" tick={{ fill: '#959595' }} domain={[0, maxBloodOxygen]} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000' }} />
        <Legend />
        <Line type="linear" dataKey="blood_oxygen" name="Spo2" strokeWidth={2} stroke="#192EEC" activeDot={{ r: 5 }} />
      </LineChart>
    </div>
  );
}
