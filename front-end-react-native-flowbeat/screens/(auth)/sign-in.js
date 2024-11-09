import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import icons from '../../constants/icons';
import images from '../../constants/images';

// Font
import PoppinsBold from '../../Components/Fonts/PoppinsBold';
import PoppinsRegular from '../../Components/Fonts/PoppinsRegular';

const SignIn = () => {
	const navigation = useNavigation();
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async () => {
		if (!phone || !password) {
			setError('Nomor handphone dan password harus diisi');
			return;
		}

		if (!validatePhone(phone)) {
			setError('Nomor handphone tidak valid');
			return;
		}

		setIsLoading(true);

		const payload = {
			noHp: phone,
			password: password,
		};

		await axios.post('https://flowbeat.web.id/api/auth/signin', payload)
		// await axios.post('http://192.168.218.236:8080/TESIS/backend_laravel/public/api/auth/signin', payload)
			.then((res) => {
				const token = res?.data?.access_token;
				AsyncStorage.setItem('token', token);
				navigation.navigate('MainApp');
			})
			.catch((error) => {
				setError('Nomor handphone atau password salah');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	const validatePhone = (phone) => {
		const re = /^\d{11,12}$/;
		return re.test(phone);
	}

	useFocusEffect(
		React.useCallback(() => {
			// Reset error state when the screen gains focus
			setError('');
			// Optionally reset other states like phone and password if needed
			setPhone('');
			setPassword('');
		}, [])
	);

	return (
		<SafeAreaView>
			<ScrollView>
				<View className="px-4 my-6">
					<PoppinsBold><Text className="text-lg">Selamat Datang</Text></PoppinsBold>
					<Text className='text-gray-400 font-pregular'>Silahkan Login Menggunakan Akun yang Sudah Terdaftar</Text>
					<View className="flex justify-center items-center">
						<Image
							source={images.heartImg}
							className="w-80 h-72"
							resizeMode='contain'
						/>
					</View>
					<View className='mt-5 mb-2'>
						<Text className='font-pregular'>Nomor handphone</Text>
					</View>
					<View className="mb-4">
						<TextInput
							className="font-pregular h-[55px] text-[13px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500"
							placeholder="Masukkan nomor handphone anda"
							onChangeText={(text) => setPhone(text)}
							keyboardType='numeric'
						/>
					</View>
					<View className='mb-2'>
						<Text className="font-pregular">Password</Text>
					</View>
					<View className="flex-row items-center border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500">
						<TextInput
							className="font-pregular text-[13px] flex-1 h-[55px] px-4"
							placeholder="Masukkan kata sandi anda"
							secureTextEntry={!isPasswordShown}
							onChangeText={(text) => setPassword(text)}
						/>
						<TouchableOpacity
							style={{ paddingRight: 10 }}
							onPress={() => setIsPasswordShown(!isPasswordShown)}>
							<Image
								source={isPasswordShown ? icons.eyeHide : icons.eye}
								style={{ width: 24, height: 24 }}
								resizeMode='contain'
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>
					<View className='flex-row gap-1 items-center'>
						{error !== '' && <Image source={icons.error} className='w-4 h-4' />}
						{error !== '' && <Text className="text-red-500 font-pregular text-[13px] pt-2">{error}</Text>}
					</View>
					<TouchableOpacity
						className='mb-5 mt-3 flex flex-row justify-end'
						onPress={() => navigation.navigate('ForgetPassword')} >
						<Text className="text-blue-500 font-pbold">Lupa password?</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="bg-blue-500 rounded-[8px] h-[55px] justify-center items-center mb-3"
						onPress={handleLogin}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#ffffff" />
						) : (
							<Text className='text-lg text-white font-pbold'>Masuk</Text>
						)}
					</TouchableOpacity>
					<View className="flex-row justify-center gap-x-1">
						<Text className='font-pregular'>Belum mempunyai akun?</Text>
						<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
							<Text className="font-pbold text-blue-500">Daftar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignIn;
