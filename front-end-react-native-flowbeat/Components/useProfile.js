
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useProfile = () => {
	const [datas, setDatas] = useState("")
	const [nama_lengkap, setNama_lengkap] = useState('')
	const [alamat, setAlamat] = useState('')
	const [tgl_lahir, setTgl_lahir] = useState('')
	const [jenis_kelamin, setJenis_kelamin] = useState('')
	const [noHp, setNoHp] = useState('')
	const [perawatan, setJenisPerawatan] = useState('')
	const [accessToken, setAccessToken] = useState('')
	const fetchProfile = async () => {
		const token = await AsyncStorage.getItem('token');
		setAccessToken(token)
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			try {
				const res = await axios.get('https://flowbeat.web.id/api/profile', config)
				// const res = await axios.get('http://192.168.218.236:8080/TESIS/backend_laravel/public/api/profile', config)
				const data = res.data.pasien_data;
				setDatas(data);
				setNama_lengkap(data.nama_lengkap);
				setAlamat(data.alamat);
				setTgl_lahir(data.tgl_lahir);
				setNoHp(data.noHp)
				setJenis_kelamin(data.jenis_kelamin)
				setJenisPerawatan(data.perawatan)
			} catch (err) {
				console.error(err)
			}
		}
	}
 
	const fetchPolarProfile = async () => {
		const accessToken = await AsyncStorage.getItem('access_token')
		const polarUserId = await AsyncStorage.getItem('x_user_id')
		if (accessToken) {
			const headers = {
				'Accept': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
			await axios.get(`https://www.polaraccesslink.com/v3/users/${polarUserId}`, { headers })
			.then((res) => {
				const data = res.data
				setNama_lengkap(data['first-name'] + ' ' + data['last-name'])
				setTgl_lahir(data.birthdate)
				if (data.gender === 'MALE') {
					setJenis_kelamin('Pria')
				} else if (data.gender === 'FEMALE') {
					setJenis_kelamin('Wanita')
				}
			})
			.catch(err => {
				console.error(err)
			})
		}
	}
	useEffect(() => {
		fetchProfile()
		fetchPolarProfile()
	}, [])

	return {
		nama_lengkap, alamat, tgl_lahir, jenis_kelamin, datas, noHp, perawatan, accessToken,
		setNama_lengkap, setAlamat, setTgl_lahir, setJenis_kelamin,
		fetchProfile, fetchPolarProfile,
	}
}

export default useProfile
