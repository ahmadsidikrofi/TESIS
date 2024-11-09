import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState, useContext, createContext } from "react";

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
	const [datas, setDatas] = useState("");
	const [nama_lengkap, setNama_lengkap] = useState('');
	const [alamat, setAlamat] = useState('');
	const [tgl_lahir, setTgl_lahir] = useState('');
	const [jenis_kelamin, setJenis_kelamin] = useState('');

	const saveProfileToStorage = async (profile) => {
		await AsyncStorage.setItem('profile', JSON.stringify(profile));
	};

	const fetchProfile = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const res = await axios.get('https://flowbeat.web.id/api/profile', config);
				const data = res.data.pasien_data;
				setNama_lengkap(data.nama_lengkap);
				setAlamat(data.alamat);
				setTgl_lahir(data.tgl_lahir);
				setJenis_kelamin(data.jenis_kelamin);
				await saveProfileToStorage(data); // Save fetched profile to storage
			} catch (err) {
				console.error('Error fetching profile:', err);
			}
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);
	// useEffect(() => {
	// 	const profile = { nama_lengkap, alamat, tgl_lahir, jenis_kelamin }
	// 	saveProfileToStorage(profile)

	// }, [nama_lengkap, alamat, jenis_kelamin, tgl_lahir])


	return (
		<ProfileContext.Provider value={{
			nama_lengkap,
			alamat,
			tgl_lahir,
			jenis_kelamin,
			datas,
			setNama_lengkap,
			setAlamat,
			setTgl_lahir,
			setJenis_kelamin,
			fetchProfile
		}}>
			{children}
		</ProfileContext.Provider>
	)
}
export const useProfileData = () => useContext(ProfileContext)
