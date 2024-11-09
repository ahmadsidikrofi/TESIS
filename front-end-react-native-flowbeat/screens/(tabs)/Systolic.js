import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import icons from '../../constants/icons';

const Systolic = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([]);
	const [lastData, setLastData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const dataSystolic = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {

			};
			const res = await axios.get('https://flowbeat.web.id/api/systolic-patient-mobile', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setDatas(res.data.blood_presure);
			setLastData(res.data.blood_presure.slice(-1));
			setIsLoading(false);

		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	}
	useEffect(() => {
		const interval = setInterval(() => {
			dataSystolic();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const renderItem = ({ item }) => (
		<View className='flex-row items-center gap-1 justify-center mb-10'>
			<Text className='text-3xl font-medium'>{item.systolic}</Text>
			<Text className='font-light text-[12px]'>mmHg</Text>
		</View>
	);

	const formatDataForChart = (datas) => {
		if (!datas || datas.length === 0) return { labels: [], datasets: [{ data: [] }] };
		const labels = datas.map(data => new Intl.DateTimeFormat('id-ID', {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		}).format(new Date(data.created_at)));

		const bloodPresure = datas.map(data => parseInt(data.systolic.slice(0, 10)));

		return {
			labels,
			datasets: [
				{
					data: bloodPresure
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
					<Text className='text-xl font-medium'>NIBP</Text>
				</View>

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
										height={220}
										yAxisLabel=""
										yAxisSuffix=" BPM"
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
											}
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
		</SafeAreaView>

	)
}

export default Systolic;
