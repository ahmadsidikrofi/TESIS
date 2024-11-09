import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import images from '../constants/images';

const LatestSystolic = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([])

	const dataSystolic = async () => {
		const token = await AsyncStorage.getItem('token')
		if (token) {
			config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
			await axios.get('https://flowbeat.web.id/api/systolic-patient-mobile', config).then((res) => {
				setDatas(res.data.blood_presure.slice(-1))
			}).catch((err) => {
				console.log(err)
			})
		}
	}
	useEffect(() => {
		setInterval(() => {
			dataSystolic();
		}, 1000)
	}, [])

	const renderItem = ({ item }) => (
		<View className='flex-row items-center gap-1'>
			<Text className='text-3xl font-medium'>{item.systolic}</Text>
			<Text className='font-light text-[12px]'>mmHg</Text>
		</View>
	);

	return (
		<View className='mt-3'>
			<TouchableOpacity
				onPress={() => navigation.navigate('Systolic')}
				style={{
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 5,
					},
					shadowOpacity: 0.34,
					shadowRadius: 6.27,

					elevation: 10,

				}}
				className='w-44 h-60 shadow-2xl bg-white rounded-[25px] p-5'>
				<Text className='text-md font-medium'>NIBP</Text>
				<Image source={images.blood}
					className='w-32 h-32'
				/>
				<FlatList
					data={datas}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default LatestSystolic
