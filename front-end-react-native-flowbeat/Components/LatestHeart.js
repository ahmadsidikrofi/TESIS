import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import images from '../constants/images';

const LatestHeart = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([])
	const [noNetwork, setNoNetwork] = useState('')

	const dataHeart = async () => {
		const token = await AsyncStorage.getItem('token')
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
			await axios.get('https://flowbeat.web.id/api/heartrate-patient-mobile', config).then((res) => {
			// await axios.get('http://192.168.218.236:8080/TESIS/backend_laravel/public/api/heartrate-patient-mobile', config).then((res) => {
				setDatas(res.data.heartrate.slice(-1))
			}).catch((err) => {
				console.log("Tidak ada jaringan", err)
				setNoNetwork("Tidak ada jaringan internet, mohon restart aplikasi")
			})
		}
	}
	useEffect(() => {
		setInterval(() => {
			dataHeart();
		}, 1000)
	}, [])

	const renderItem = ({ item }) => (
		<View className='flex-row items-center gap-1'>
			<Text className='text-4xl font-pbold'>{item.heart_beats}</Text>
		</View>
	);

	return (
		<View className='w-full h-64 bg-[#FF6969] rounded-[40px]'
			style={{
				shadowColor: "#000",
				shadowOffset: {
					width: 0.5,
					height: 0.5,
				},
				shadowOpacity: 0.3,
				shadowRadius: 2,
				elevation: 5,
			}}
		>
			<TouchableOpacity
				onPress={() => navigation.navigate('HeartRate')}
			>
				<View className='flex flex-row items-center justify-between'>
					<View className='px-8 py-5 items-center'>
						<View className='bg-white rounded-full w-16 h-16 items-center justify-center'>
							<AntDesign name="hearto" size={35} color="black" />
						</View>
						<Text className='text-xl font-pmedium my-5'>Heartrate</Text>
						{/* <Text className='p-2 text-red-500 font-pbold rounded-md bg-white'>{noNetwork}</Text> */}
						<FlatList
							data={datas}
							renderItem={renderItem}
							keyExtractor={(item, index) => index.toString()}
						/>
						<Text className='text-center text-2xl'>BPM</Text>
					</View>
					<View className='p-2 flex-1 items-center justify-center '>
						<View className='bg-white rounded-[30px] mr-2 p-2'>
							<Image source={images.heartattack} width={300} height={300} className='w-40 h-full object-contain' />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	)
}
export default LatestHeart
