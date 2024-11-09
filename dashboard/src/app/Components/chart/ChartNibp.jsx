'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function ChartNibp({ slug }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`https://flowbeat.web.id/api/nibp-patient/${slug}`);
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

  const maxPatient_temp = Math.max(...data.map((item) => item.systolic));
  return (
    <div className="mt-10 bg-white rounded-lg shadow p-5 px-10 py-10">
      <h1 className="text-xl text-[#5d87ff] mb-5 font-bold">Grafik Nibp</h1>
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
        <XAxis dataKey="created_at" className="text-[13px]" />
        <YAxis dataKey="systolic" domain={[0, maxPatient_temp]} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000' }} />
        <Legend />
        <Line type="linear" dataKey="systolic" name="Nibp" strokeWidth={2} stroke="#800000" activeDot={{ r: 5 }} />
      </LineChart>
    </div>
  );
}
