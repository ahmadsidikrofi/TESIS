import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import icons from '../../constants/icons';

// Fonts
import PoppinsBold from '../../Components/Fonts/PoppinsBold';
import PoppinsRegular from '../../Components/Fonts/PoppinsRegular';
import PoppinsMedium from '../../Components/Fonts/Poppins-Medium';
import PoppinsThin from '../../Components/Fonts/Poppins-Thin';

const SignUp = () => {
	const navigation = useNavigation();
	const [nama, setNama] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [massage, setMassage] = useState('');
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
	const [error, setError] = useState('');

	const handleRegis = async () => {

		// Validasi input
		if (!nama || !phone || !password || !confirmPassword) {
			setError('Semua kolom harus dilengkapi');
			return;
		}
		if (password !== confirmPassword) {
			setError('Password dan konfirmasi password harus sama');
			return;
		}
		if (!validatePhone(phone)) {
			setError('Nomor handphone tidak valid');
			return;
		}

		setError('');

		const payload = {
			nama_lengkap: nama,
			noHp: phone,
			password: password,
		};

		await axios.post('https://flowbeat.web.id/api/auth/signup', payload)
			.then((res) => {
				setMassage('berhasil masuk ke database');
				navigation.navigate('SignIn');
			})
			.catch((error) => {
				console.log('Error:', error.response.data);
				setMassage('Gagal mendaftar. Silakan coba lagi.');
			});


		setIsPasswordShown(false);
		setIsConfirmPasswordShown(false);
	}


	const validatePhone = (phone) => {
		const re = /^\d{11,12}$/;
		return re.test(phone);
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<Text className='text-xl font-pbold'>Buat Akun</Text>
					<Text className='text-gray-400 font-pregular'>Daftarkan Akun Anda Sebelum Melakukan Login</Text>
					<View className='mt-24'>
						<View className='mb-2'>
							<Text className='font-pregular'>Nama lengkap</Text>
						</View>
						<View className='mb-4 h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
							<TextInput
								className=' w-full font-pregular text-[13px]'
								placeholder='Masukan nama lengkap anda'
								onChangeText={(e) => setNama(e)}
							/>
						</View>

						<View className='mb-2'>
							<Text className='font-pregular'>Nomor handphone</Text>
						</View>
						<View className='mb-4 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
							<TextInput
								className=' w-full font-pregular text-[13px]'
								placeholder='Masukan nomor handphone anda'
								onChangeText={(e) => setPhone(e)}
								keyboardType='numeric'
							/>
						</View>

						<View className='mb-2'>
							<Text className='font-pregular'>Password</Text>
						</View>
						<View className='mb-4 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
							<TextInput className=' w-full font-pregular text-[13px]'
								placeholder='Masukan kata sandi anda'
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
							<Text className='font-pregular'>Konfirmasi password</Text>
						</View>
						<View className=' w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
							<TextInput className='font-pregular w-full text-[13px]'
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

						{/* Pesan error */}
						<View className='flex-row gap-1 items-center'>
							{error !== '' && <Image source={icons.error} className='w-4 h-4' />}
							{error !== '' && <Text className="text-red-500 font-pregular pt-2 text-[13px]">{error}</Text>}
						</View>

						<TouchableOpacity
							className='mt-6 bg-blue-500 rounded-[8px] h-[55px] justify-center items-center'
							onPress={handleRegis}>
							<Text className='font-pbold text-lg text-white'>Daftar</Text>
						</TouchableOpacity>


						{/* Tautan untuk login */}
						<View className="justify-center pt-5 flex-row gap-x-1">
							<Text className="text-black-200 font-pregular">Sudah mempunyai akun?</Text>
							<TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
								<Text className='font-pbold text-blue-500'>Masuk</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignUp;
