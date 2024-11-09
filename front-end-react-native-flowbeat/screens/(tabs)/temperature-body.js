import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import icons from '../../constants/icons';

const TemperatureBody = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([]);
	const [lastData, setLastData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [averageTemp, setAverageTemp] = useState(0);
	const [minTemp, setMinTemp] = useState(0);
	const [maxTemp, setMaxTemp] = useState(0);

	const dataTemperature = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				const res = await axios.get('https://flowbeat.web.id/api/temp-patient-mobile', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				const temps = res.data.patient_temp;
				setDatas(temps);
				setLastData(temps.slice(-1));
				calculateStatistics(temps);
				setIsLoading(false);
			}
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	}

	const calculateStatistics = (temps) => {
		if (temps.length === 0) return;
		const tempValues = temps.map(data => parseInt(data.patient_temp));
		const total = tempValues.reduce((sum, temp) => sum + temp, 0);
		const average = total / tempValues.length;
		const min = Math.min(...tempValues);
		const max = Math.max(...tempValues);

		setAverageTemp(Math.round(average * 100) / 100);
		setMinTemp(min);
		setMaxTemp(max);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			dataTemperature();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const renderItem = ({ item }) => (
		<View className='flex-row items-center gap-1 justify-center mb-10'>
			<Image source={icons.temperature} className='w-8 h-8 mb-1' />
			<Text className='text-3xl font-medium'>{item.patient_temp}</Text>
			<Text className='font-pregular text-[12px]'>°C</Text>
		</View>
	);

	const formatDataForChart = (datas) => {
		if (!datas || datas.length === 0) return { labels: [], datasets: [{ data: [] }] };

		const step = Math.ceil(datas.length / 10);
		const labels = datas
			.filter((_, index) => index % step === 0)
			.map(data => new Intl.DateTimeFormat('id-ID', {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}).format(new Date(data.created_at)));

		const tempValues = datas.map(data => parseFloat(data.patient_temp));

		return {
			labels,
			datasets: [
				{
					data: tempValues
				}
			]
		};
	}

	const chartData = formatDataForChart(datas);

	return (
		<SafeAreaView className='flex-1'>
			<View className='w-full min-h-[85vh] px-4 my-6'>
				<View className='flex-row items-center gap-2 mb-10'>
					<TouchableOpacity
						className='w-6 h-6'
						onPress={() => navigation.navigate('MainApp')}>
						<Image source={icons.back} className='w-6 h-6' />
					</TouchableOpacity>
					<Text className='text-xl font-medium'>Suhu Tubuh</Text>
				</View>

				<View className='mb-3'>
					<FlatList
						data={lastData}
						renderItem={renderItem}
						keyExtractor={(item, index) => index.toString()}
						ListFooterComponent={
							<>
								{isLoading ? (
									<ActivityIndicator size="large" color="#fbe285" />
								) : (
									<View>
										<LineChart
											data={chartData}
											width={Dimensions.get("window").width - 32}
											height={300}
											yAxisLabel=""
											yAxisSuffix="°C"
											yAxisInterval={1}
											chartConfig={{
												backgroundColor: "#ffecb3",
												backgroundGradientFrom: "#fff9e6",
												backgroundGradientTo: "#ffecb3",
												decimalPlaces: 2,
												color: (opacity = 0.6) => `rgba(255, 165, 0, ${opacity})`,
												labelColor: (opacity = 0.6) => `rgba(255, 165, 0, ${opacity})`,
												style: {
													borderRadius: 16
												},
												propsForDots: {
													r: "3",
													strokeWidth: "0",
													stroke: "#FFA500"
												},
												propsForHorizontalLabels: {
													fontSize: 10,
													fill: "#FFA500"
												},
												propsForVerticalLabels: {
													fontSize: 10,
													fill: "#FFA500",
													rotation: 40,
												},
												propsForBackgroundLines: {
													stroke: "#ffe999",
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

				<View className='w-[100%] bg-[#fbe285] rounded-xl p-4 mb-4'>
					<Text className='font-pmedium '>Rata-rata</Text>
					<View className='flex-row justify-center mt-3'>
						<Text className='text-3xl font-pmedium mr-1'>{averageTemp}</Text>
						<Text className='font-pregular text-[12px] mt-3'>°C</Text>
					</View>
				</View>

				<View className='flex-row justify-between'>
					<View className='w-[48%] bg-[#fbe285] rounded-xl p-4'>
						<Text className='text-sm font-pmedium'>Suhu Terendah</Text>
						<View className='flex-row justify-center mt-3'>
							<Text className='text-3xl font-pmedium mr-1'>{minTemp}</Text>
							<Text className='font-pregular text-[12px] mt-3'>°C</Text>
						</View>
					</View>
					<View className='w-[48%] bg-[#fbe285] rounded-xl p-4'>
						<Text className='text-sm font-pmedium'>Suhu Tertinggi</Text>
						<View className='flex-row justify-center mt-3'>
							<Text className='text-3xl font-pmedium mr-1'>{maxTemp}</Text>
							<Text className='font-pregular text-[12px] mt-3'>°C</Text>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default TemperatureBody;
