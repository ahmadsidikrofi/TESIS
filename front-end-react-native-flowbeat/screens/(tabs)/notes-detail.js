import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import icons from '../../constants/icons'

const NotesDetail = ({ route }) => {

	const parseHtmlToText = (htmlString) => {
		return htmlString
			.replace(/<h1>(.*?)<\/h1>/g, "\n\n$1\n")
			.replace(/<li>(.*?)<\/li>/g, "• $1\n")
			.replace(/<\/?[^>]+(>|$)/g, "")
			.trim()
	};
	const navigation = useNavigation();
	const { title, description, jam } = route.params
	const cleanDescription = parseHtmlToText(description)
	return (
		<SafeAreaView>
			<ScrollView>
				<View className="px-4 my-6">
					<View className='flex-row items-center gap-2 mb-10'>
						<TouchableOpacity onPress={() => navigation.navigate('Notes')}>
							<Image source={icons.back} className='w-6 h-6' />
						</TouchableOpacity>
						<Text className='text-2xl font-pbold'>Detail Notes</Text>
					</View>

					<Text className='font-pbold text-2xl mb-4'>{title}</Text>
					<Text className='font-pregular mb-12'>{cleanDescription}</Text>
				</View>
			</ScrollView>
			<View className='absolute bottom-4 right-4 bg-white py-2 px-4 rounded-full'>
				<Text className='text-[11px] font-pbold'>
					{new Intl.DateTimeFormat('id-ID', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric'
					}).format(new Date(jam))}
				</Text>
			</View>
		</SafeAreaView>
	)
}

export default NotesDetail
