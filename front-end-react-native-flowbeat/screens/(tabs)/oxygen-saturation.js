import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import axios from 'axios'
import { LineChart } from "react-native-chart-kit";

import icons from '../../constants/icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OxygenSaturation = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([])
	const [lastData, setLastData] = useState([]);
	const [isLoading, setIsLoading] = useState(true)
	const [avgOxygen, setAvgOxygen] = useState(0)
	const [minOxygen, setMinOxygen] = useState(0)
	const [maxOxygen, setMaxOxygen] = useState(0)

	const Spo2 = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {

			};
			const res = await axios.get('https://flowbeat.web.id/api/oxymeter-patient-mobile', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const bloodOxygen = res.data.oxygen;
			setDatas(bloodOxygen);
			setLastData(bloodOxygen.slice(-1));
			calculateStatistics(bloodOxygen);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	}

	const calculateStatistics = (oxygenData) => {
		if (oxygenData.length === 0) return;
		const oxygenSaturaion = oxygenData.map(data => parseInt(data.blood_oxygen));
		const total = oxygenSaturaion.reduce((sum, oxygenData) => sum + oxygenData, 0);
		const average = total / oxygenSaturaion.length;
		const min = Math.min(...oxygenSaturaion);
		const max = Math.max(...oxygenSaturaion);

		setAvgOxygen(Math.round(average));
		setMinOxygen(min);
		setMaxOxygen(max);
	}

	useEffect(() => {
		setInterval(() => {
			Spo2();
		}, 1000)
		return () => clearInterval();
	}, []);

	const renderItem = ({ item }) => (
		<View className='flex-row items-center gap-1 justify-center mb-10'>
			<Image source={icons.oxygen} className='w-9 h-9 mb-1' />
			<Text className='text-3xl font-medium'>{item.blood_oxygen}</Text>
			<Text className='font-light text-[12px]'>%</Text>
		</View>
	);

	const formatDataForChart = (datas) => {
		if (!datas || datas.length === 0) return { labels: [], datasets: [{ data: [] }] };
		const step = Math.ceil(datas.length / 10);
		const labels = datas.filter((_, index) => index % step === 0)
			.map(data => new Intl.DateTimeFormat('id-ID', {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}).format(new Date(data.created_at)));

		const Spo2 = datas.map(data => parseInt(data.blood_oxygen.slice(0, 10)));

		return {
			labels,
			datasets: [
				{
					data: Spo2
				}
			]
		};
	}
	const chartData = formatDataForChart(datas);

	return (
		<SafeAreaView className='flex-1'>
			<View className='w-full min-h-[85vh] px-4 my-6'>
				<View className='flex-row items-center gap-2 mb-10'>
					<TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
						<Image source={icons.back} className='w-6 h-6' />
					</TouchableOpacity>
					<Text className='text-xl font-medium'>Saturasi Oksigen</Text>
				</View>
				<View className='mb-3'>
					<FlatList
						data={lastData}
						renderItem={renderItem}
						keyExtractor={(item, index) => index.toString()}
						ListFooterComponent={
							<>
								{isLoading ? (
									<ActivityIndicator size="large" color="##1e88e5" />
								) : (
									<View>
										<LineChart
											data={chartData}
											width={Dimensions.get("window").width - 32}
											height={300}
											yAxisLabel=""
											yAxisSuffix=" %"
											yAxisInterval={1}
											chartConfig={{
												backgroundColor: "#e3f2fd",
												backgroundGradientFrom: "#bbdefb",
												backgroundGradientTo: "#90caf9",
												decimalPlaces: 0,
												color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,  // Warna biru dengan sedikit transparansi
												labelColor: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
												style: {
													borderRadius: 16
												},
												propsForDots: {
													r: "3",
													strokeWidth: "0",
													stroke: "#1e88e5"
												},
												propsForVerticalLabels: {
													fontSize: 10,
													fill: "#1e88e5",
													rotation: 40,
												},
											}}
											style={{
												marginVertical: 8,
												borderRadius: 16,
												marginHorizontal: 0
											}}
										/>
									</View>
								)}
							</>
						}
					/>
				</View>
				<View className='w-[100%] bg-[#bce7f0] rounded-xl p-4 mb-4'>
					<Text className='text-sm font-pmedium'>Rata-rata</Text>
					<View className='flex-row justify-center mt-3'>
						<Text className='text-3xl font-pmedium mr-1'>{avgOxygen}</Text>
						<Text className='font-pregular text-[12px] mt-3'>%</Text>
					</View>
				</View>

				<View className='flex-row justify-between'>
					<View className='w-[48%] bg-[#bce7f0] rounded-xl p-4'>
						<Text className='text-sm font-pmedium'>Oksigen Terendah</Text>
						<View className='flex-row justify-center mt-3'>
							<Text className='text-3xl font-pmedium mr-1'>{minOxygen}</Text>
							<Text className='font-pregular text-[12px] mt-3'>%</Text>
						</View>
					</View>
					<View className='w-[48%] bg-[#bce7f0] rounded-xl p-4'>
						<Text className='text-sm font-pmedium'>Oksigen Tertinggi</Text>
						<View className='flex-row justify-center mt-3'>
							<Text className='text-3xl font-pmedium mr-1'>{maxOxygen}</Text>
							<Text className='font-pregular text-[12px] mt-3'>%</Text>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default OxygenSaturation
