import { View, Text, ScrollView, Image, TouchableOpacity, Linking, } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import images from '../../constants/images'

// Fonts
import PoppinsBold from '../../Components/Fonts/PoppinsBold';
  
const BeforeLogin = () => {
	const navigation = useNavigation()

	const handleSignInWithPolar = () => {
		Linking.openURL('https://flow.polar.com/oauth2/authorization?response_type=code&client_id=55a69c83-e0e8-4f95-abb6-491fdaf9695c&redirect_uri=https://flowbeat123.vercel.app/auth/callback&scope=accesslink.read_all')
		navigation.navigate('PolarCode')
	}

	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className='mt-8 px-4'>
					<PoppinsBold><Text className='text-[31px]'>Selalu Terhubung dengan Detak Jantungmu</Text></PoppinsBold>
					<View className='justify-center items-center mb-5 mt-14'>
						<Image source={images.nurse}
							className='w-[310px] h-[310px]'
							resizeMode='contain'
						/>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignIn')}
						className='bg-blue-500 rounded-xl p-2 justify-center items-center mt-10 mb-5'>
						<PoppinsBold><Text className='text-[22px] text-white'>Masuk</Text></PoppinsBold>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleSignInWithPolar}
						className='bg-blue-500 rounded-xl p-2 justify-center items-center mb-5'>
						<PoppinsBold><Text className='text-[22px] text-white'>Masuk dengan Polar</Text></PoppinsBold>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignUp')}
						className='bg-blue-500 rounded-xl p-2 justify-center items-center'>
						<PoppinsBold><Text className='text-[22px] text-white'>Daftar</Text></PoppinsBold>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>

	)
}

export default BeforeLogin
