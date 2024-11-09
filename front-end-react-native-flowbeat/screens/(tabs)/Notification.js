import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, handleInfoPress, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import icons from '../../constants/icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Notification = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([])
	const [firstLoad, setFirstLoad] = useState([])
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	const dataNotification = async () => {
		const token = await AsyncStorage.getItem('token')
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		await axios.get('https://flowbeat.web.id/api/notifications-mobile', config).then((res) => {
			setDatas(res.data)
			setFirstLoad(res.data.slice(0, 10))
		}).catch((err) => {
		})
	}

	const loadMoreData = () => {
		if (isLoading) return;
		setIsLoading(true);
		setTimeout(() => {
			const nextPage = page + 1;
			const newDisplayedData = datas.slice(0, nextPage * 10);
			setFirstLoad(newDisplayedData);
			setPage(nextPage);
			setIsLoading(false);
		}, 1500);
	}

	useEffect(() => {
		dataNotification();
	}, [])

	const handleInfoPress = () => {
		Alert.alert('Informasi', 'Ini adalah halaman notifikasi, terus pantau untuk melihat kondisi anda.');
	}

	return (
		<SafeAreaView>
			<ScrollView
				onScroll={({ nativeEvent }) => {
					if (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height - 20) {
						loadMoreData();
					}
				}}
				scrollEventThrottle={16}
			>
				<View className='w-full min-h-[85vh] px-4 my-6'>
					<View
						className='flex-row items-center justify-between gap-2 mb-10'>
						<View className='flex-row items-center'>
							<TouchableOpacity
								className='	w-6 h-6'
								onPress={() => navigation.navigate('MainApp')}>
								<Image source={icons.back}
									className='	w-6 h-6'
								/>
							</TouchableOpacity>
							<Text className='text-xl font-pbold ml-2'>Notification</Text>
						</View>
						<TouchableOpacity onPress={handleInfoPress}>
							<MaterialIcons name="info-outline" size={34} color="black" />
						</TouchableOpacity>
					</View>

					{/* Date */}
					<View>
						{firstLoad.map((data, i) => {
							const totalScore = data.total_score
							{
								if (totalScore >= 1 && totalScore <= 4) {
									return (
										<View key={i} className='bg-white rounded-xl shadow-lg mb-3'>
											<View className='flex-row  items-center justify-between mb-3'>
												<Text className='font-pbold mb-2'>Info tanda vital</Text>

												<Text className='font-pregular text-[10px] mt-3 text-gray-800 text-right'> {new Intl.DateTimeFormat('id-ID', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
													hour: 'numeric',
													minute: 'numeric'
												}).format(new Date(data.created_at))}</Text>
											</View>
											<Text className='font-pregular'>Kondisi anda sedang baik, tetap pertahankan kondisi anda</Text>
										</View>
									)

								} else if (totalScore >= 6 && totalScore <= 7) {
									return (
										<View key={i} className='bg-white p-5 rounded-xl shadow-lg mb-3'
											style={{
												shadowColor: "#000",
												shadowOffset: {
													width: 0,
													height: 5,
												},
												shadowOpacity: 0.34,
												shadowRadius: 5.27,

												elevation: 5,

											}}>
											<View className='flex-row  items-center justify-between mb-3'>
												<Text className='font-pbold'>Info tanda vital</Text>
												<Text className='font-pregular text-[10px] text-gray-800 text-right'> {new Intl.DateTimeFormat('id-ID', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
													hour: 'numeric',
													minute: 'numeric'
												}).format(new Date(data.created_at))}</Text>
											</View>
											<Text className='font-pregular text-[12px]'>Kondisi anda sedang kurang baik, istirahat sejenak untuk memulihkan kondisi anda menjadi lebih baik</Text>
										</View>
									)
								} else if (totalScore >= 7) {
									return (
										<View key={i} className='bg-white p-5 rounded-xl mb-3'
											style={{
												shadowColor: "#000",
												shadowOffset: {
													width: 0,
													height: 5,
												},
												shadowOpacity: 0.34,
												shadowRadius: 6.27,

												elevation: 10,

											}}>
											<View className='flex-row  items-center justify-between mb-3'>
												<Text className='font-pbold'>Info tanda vital</Text>
												<Text className='font-pregular text-[10px] text-gray-800 text-right'> {new Intl.DateTimeFormat('id-ID', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
													hour: 'numeric',
													minute: 'numeric'
												}).format(new Date(data.created_at))}</Text>
											</View>
											<Text className='font-pregular text-[12px]'>Kondisi anda sedang tidak baik, segera istirahat untuk menenangkankan diri anda</Text>
										</View>
									)
								}
							}
						})}
					</View>
					{/* End */}

					{isLoading && <ActivityIndicator size="large" />}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Notification
