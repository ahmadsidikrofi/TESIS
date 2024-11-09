import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import images from '../../constants/images';
import icons from '../../constants/icons';

// Fonts
import PoppinsBold from '../../Components/Fonts/PoppinsBold';
import PoppinsRegular from '../../Components/Fonts/PoppinsRegular';
import PoppinsMedium from '../../Components/Fonts/Poppins-Medium';
import PoppinsThin from '../../Components/Fonts/Poppins-Thin';

const ForgetPassword = () => {
	const navigation = useNavigation();
	const [noHp, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleForgetPassword = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const payload = {
			noHp,
			password,
		};

		if (!noHp || !password || !confirmPassword) {
			setError('Semua kolom harus diisi');
			setIsLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError('Password harus sama');
			setIsLoading(false);
			return;
		}

		try {
			await axios.post('https://flowbeat.web.id/api/auth/lupa-password', payload);
			setIsLoading(false);
			alert('Password anda telah diperbarahui');
			navigation.navigate('SignIn');
		} catch (error) {
			console.error('Terjadi kesalahan:', error);
			setError('Nomor HP Anda tidak terdaftar');
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView>
			<ScrollView>
				<View className="px-4 my-6">
					<View className='flex-row gap-3'>
						<View className='pt-1'>
							<TouchableOpacity
								onPress={() => navigation.navigate('SignIn')}>
								<Image source={icons.back} className='w-6 h-6' />
							</TouchableOpacity>
						</View>
						<View>
							<PoppinsBold><Text className='text-xl'>Lupa Password</Text></PoppinsBold>
							<PoppinsRegular><Text className='text-md text-gray-500'>Silakan Isi Data dengan Benar untuk Mereset Password Anda</Text></PoppinsRegular>
						</View>
					</View>
					<View className="flex justify-center items-center">
						<Image source={images.forgotpassword} className="w-65 h-60" resizeMode='contain' />
					</View>
					<View className='mt-5 mb-2'>
						<PoppinsRegular><Text>Nomor Handphone</Text></PoppinsRegular>
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
						<PoppinsRegular><Text className="mb-2">Password baru</Text></PoppinsRegular>
					</View>
					<View className='mb-4 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
						<TextInput className='font-pregular text-[13px] w-full'
							placeholder='Masukan kata sandi baru anda'
							secureTextEntry={!isPasswordShown}
							onChangeText={(e) => setPassword(e)}
						/>
						<TouchableOpacity
							className='absolute right-[20]'
							onPress={() => setIsPasswordShown(!isPasswordShown)}>
							<Image
								source={isPasswordShown ? icons.eyeHide : icons.eye}
								style={{ width: 24, height: 24 }}
								resizeMode='contain'
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>
					<View className='mb-2'>
						<PoppinsRegular><Text className="mb-2">Konfirmasi password baru</Text></PoppinsRegular>
					</View>
					<View className='mb-3 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
						<TextInput className='font-pregular text-[13px] w-full'
							placeholder='Konfirmasi kata sandi anda'
							secureTextEntry={!isConfirmPasswordShown}
							onChangeText={(e) => setConfirmPassword(e)}
						/>
						<TouchableOpacity
							className='absolute right-[20]'
							onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}>
							<Image
								source={isConfirmPasswordShown ? icons.eyeHide : icons.eye}
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
						className="bg-blue-500 rounded-[8px] h-[55px] justify-center items-center mt-3"
						onPress={handleForgetPassword}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#ffffff" />
						) : (
							<PoppinsBold><Text className="text-lg text-white">Perbarui</Text></PoppinsBold>
						)}
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};


export default ForgetPassword;
