import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

import images from '../constants/images'
import { MaterialIcons } from '@expo/vector-icons';

const LatestOxygen = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([])

	const dataOxygen = async () => {
		const token = await AsyncStorage.getItem('token')
		if (token) {
			config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
			await axios.get('https://flowbeat.web.id/api/oxymeter-patient-mobile', config).then((res) => {
				setDatas(res.data.oxygen.slice(-1))
			}).catch((err) => {
				console.log(err)
			})
		}
	}
	useEffect(() => {
		setInterval(() => {
			dataOxygen();
		}, 1000)
	}, [])

	const renderItem = ({ item }) => (
		<View className='flex-row items-center gap-1'>
			<Text className='text-4xl font-pmedium'>{item.blood_oxygen}</Text>
			<Text className='font-preguler text-[18px]'>%</Text>
		</View>
	)

	return (
		<View className='mt-3'>
			<TouchableOpacity
				onPress={() => navigation.navigate('OxygenSaturation')}
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
				className='w-44 h-60 shadow-2xl bg-[#bce7f0] rounded-[40px] p-5'
			>
				{/* <Image source={images.oksigen}
					className='w-32 h-32'
				/> */}
				<View className='bg-white rounded-full w-16 h-16 items-center justify-center mb-9'>
					<MaterialIcons name="air" size={35} color="black" />
				</View>
				<Text className='text-sm font-pmedium my-3'>Oksigen Tubuh</Text>
				<FlatList
					data={datas}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default LatestOxygen
