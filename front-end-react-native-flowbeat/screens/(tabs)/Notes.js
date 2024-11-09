import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Notes = () => {
	const [originalDatas, setOriginalDatas] = useState([]); // Menyimpan data asli
	const [datas, setDatas] = useState([]);
	const [searchText, setSearchText] = useState('');
	const navigation = useNavigation();

	const parseHtmlToText = (htmlString) => {
		return htmlString
			.replace(/<h1>(.*?)<\/h1>/g, "\n\n$1\n")
			.replace(/<li>(.*?)<\/li>/g, "• $1\n")
			.replace(/<\/?[^>]+(>|$)/g, "")
			.trim()
	};

	const dataNotes = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				const res = await axios.get('https://flowbeat.web.id/api/notes-mobile', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				console.log(res.data);
				if (Array.isArray(res.data)) {
					setDatas(res.data);
					setOriginalDatas(res.data);
				} else {
					setDatas([]);
					setOriginalDatas([]);
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		dataNotes();
	}, [])

	const handleSearch = () => {
		// Filter data based on search text
		const filteredData = originalDatas.filter(data =>
			data.title.toLowerCase().includes(searchText.toLowerCase()) ||
			data.description.toLowerCase().includes(searchText.toLowerCase())
		);
		setDatas(filteredData);
	}

	const handleClearSearch = () => {
		setSearchText(''); // Kosongkan TextInput
		setDatas(originalDatas); // Setel kembali ke data asli
	}

	const handleInfoPress = () => {
		Alert.alert('Informasi', 'Ini adalah halaman catatan Anda. Anda dapat mencari dan melihat catatan Anda di sini.');
	}

	return (
		<SafeAreaView className="flex-1">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="mb-5">
						<View className='flex-row justify-between'>
							<Text className="font-pbold text-2xl">Notes</Text>
							<TouchableOpacity onPress={handleInfoPress}>
								<MaterialIcons name="info-outline" size={34} color="black" />
							</TouchableOpacity>
						</View>
						<View className='flex-row items-center'>
							<View className='relative flex-1'>
								<TextInput
									className='font-pregular p-3 border-gray-300 rounded-2xl w-full mt-5 bg-gray-200 pr-10'
									placeholder="Telusuri"
									value={searchText}
									onChangeText={text => setSearchText(text)}
									onSubmitEditing={handleSearch}
								/>
								{searchText !== '' && (
									<TouchableOpacity onPress={handleClearSearch} className='absolute right-3 top-7'>
										<Ionicons name="close-outline" size={34} color="black" />
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
					{
						datas.length < 1 ? (
							<View className='mt-48'>
								<View className='mx-auto'>
									<FontAwesome5 name="notes-medical" size={84} color="#3C83F6" />
								</View>
								<View className='mx-auto'>
									<Text className='font-pmedium text-slate-800 mt-3'>Kamu belum diberi catatan perawat</Text>
								</View>
							</View>
						) : (
							<View className="flex-row flex-wrap justify-between">
								{

									datas.map((data) => (
										<TouchableOpacity
											key={data.id}
											title={data.title}
											description={data.description}
											jam={data.created_at}
											onPress={() =>
												navigation.navigate('NotesDetail', {
													title: data.title,
													description: data.description,
													jam: data.created_at,
												})
											}
											className="bg-white w-[48%] h-52 mb-4 rounded-xl p-3 shadow-lg relative"
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
											<Text ellipsizeMode='tail' numberOfLines={2}
												className="font-pbold mb-2 text-[15px]">
												{data.title}</Text>
											<Text ellipsizeMode='tail' numberOfLines={2}
												className='font-pregular text-[12px]'>
												{parseHtmlToText(data.description)}</Text>
											<Text className="font-pregular text-[9px] text-gray-800 absolute bottom-2 right-3">
												{new Intl.DateTimeFormat('id-ID', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
													hour: 'numeric',
													minute: 'numeric'
												}).format(new Date(data.created_at))}
											</Text>
										</TouchableOpacity>
									))
								}
							</View>
						)
					}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Notes;
