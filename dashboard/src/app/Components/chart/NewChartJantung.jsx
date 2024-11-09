import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

export default function NewChartJantung({ slug }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://flowbeat.web.id/api/heartrate-patient/${slug}`);
        const formattedData = res.data.map((item) => ({
          ...item,
          created_at: new Date(item.created_at).toLocaleString(),
        }));
        ``;
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [slug]);

  const maxHeartBeats = Math.max(...data.map((item) => item.heart_beats));
  return (
    <div className="mt-10 justify-center dark:bg-black bg-white rounded-lg shadow p-5 px-10 py-10">
      <h1 className="text-xl mb-5 text-[#5d87ff] font-bold dark:text-white">Grafik Detak Jantung</h1>
      <LineChart
        width={810}
        height={350}
        data={data}
        margin={{
          top: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal />
        <XAxis dataKey="created_at" tick={{ fill: '#959595' }} />
        <YAxis type="number" orientation="left" domain={[0, maxHeartBeats]} allowDataOverflow includeHidden tick={{ fill: '#959595' }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000' }} />
        <Legend />
        <Line type="linear" dataKey="heart_beats" name="Detak jantung" strokeWidth={2} stroke="#FF2D00" activeDot={{ r: 5 }} />
      </LineChart>
    </div>
  );
}
