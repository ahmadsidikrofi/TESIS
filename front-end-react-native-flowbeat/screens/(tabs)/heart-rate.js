import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import icons from '../../constants/icons';

const HeartRate = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([]);
	const [lastData, setLastData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [averageHeartRate, setAverageHeartRate] = useState(0);
	const [minHeartRate, setMinHeartRate] = useState(null);
	const [maxHeartRate, setMaxHeartRate] = useState(null);

	const dataHeart = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				const res = await axios.get('https://flowbeat.web.id/api/heartrate-patient-mobile', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				const heartRates = res.data.heartrate;
				setDatas(heartRates);
				setLastData(heartRates.slice(-1));
				calculateStatistics(heartRates);
				setIsLoading(false);
			}
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	}

	const calculateStatistics = (heartRates) => {
		if (heartRates.length === 0) return;
		const heartBeats = heartRates.map(data => parseInt(data.heart_beats));
		const total = heartBeats.reduce((sum, heartBeat) => sum + heartBeat, 0);
		const average = total / heartBeats.length;
		const min = Math.min(...heartBeats);
		const max = Math.max(...heartBeats);

		setAverageHeartRate(Math.round(average));
		setMinHeartRate(min);
		setMaxHeartRate(max);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			dataHeart();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const renderItem = ({ item }) => (
		<View className='flex-row items-center gap-1 justify-center mb-10'>
			<Image source={icons.love} className='w-8 h-8 mb-2' />
			<Text className='text-3xl font-pmedium'>{item.heart_beats}</Text>
			<Text className='font-pregular text-[12px]'>BPM</Text>
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

		const heartBeats = datas.map(data => parseInt(data.heart_beats));

		return {
			labels,
			datasets: [
				{
					data: heartBeats
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
					<Text className='text-xl font-pmedium'>Detak Jantung</Text>
				</View>

				<View className='mb-3'>
					<FlatList
						data={lastData}
						renderItem={renderItem}
						keyExtractor={(item, index) => index.toString()}
						ListFooterComponent={
							<>
								{isLoading ? (
									<ActivityIndicator size="large" color="#FF6969" />
								) : (
									<View>
										<LineChart
											data={chartData}
											width={Dimensions.get("window").width - 32}
											height={300}
											yAxisLabel=""
											yAxisSuffix=" BPM"
											yAxisInterval={1}
											chartConfig={{
												backgroundColor: "#ffe6e6",
												backgroundGradientFrom: "#ffcccc",
												backgroundGradientTo: "#ff9999",
												decimalPlaces: 0,
												color: (opacity = 1) => `rgba(255, 105, 105, ${opacity})`,
												labelColor: (opacity = 1) => `rgba(255, 105, 105, ${opacity})`,
												style: {
													borderRadius: 16
												},
												propsForDots: {
													r: "3",
													strokeWidth: "0",
													stroke: "#FF6969"
												},
												propsForHorizontalLabels: {
													fontSize: 10,
													fill: "#FF6969"
												},
												propsForVerticalLabels: {
													fontSize: 10,
													fill: "#FF6969",
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

				<View className='w-[100%] bg-[#FF6969] rounded-xl p-4 mb-4'>
					<Text className='text-sm font-pmedium'>Rata-rata</Text>
					<View className='flex-row justify-center mt-3'>
						<Text className='text-3xl font-pmedium mr-1'>{averageHeartRate}</Text>
						<Text className='font-pregular text-[12px] mt-3'>BPM</Text>
					</View>
				</View>

				<View className='flex-row justify-between'>
					<View className='w-[48%] bg-[#FF6969] rounded-xl p-4'>
						<Text className='text-sm font-pmedium'>Detak Jantung Terendah</Text>
						<View className='flex-row justify-center mt-3'>
							<Text className='text-3xl font-pmedium mr-1'>{minHeartRate}</Text>
							<Text className='font-pregular text-[12px] mt-3'>BPM</Text>
						</View>
					</View>
					<View className='w-[48%] bg-[#FF6969] rounded-xl p-4'>
						<Text className='text-sm font-pmedium'>Detak Jantung Tertinggi</Text>
						<View className='flex-row justify-center mt-3'>
							<Text className='text-3xl font-pmedium mr-1'>{maxHeartRate}</Text>
							<Text className='font-pregular text-[12px] mt-3'>BPM</Text>
						</View>
					</View>
				</View>
				{/* <View className='flex-row mt-5 justify-between'>
				</View> */}
			</View>
		</SafeAreaView>
	)
}

export default HeartRate;
