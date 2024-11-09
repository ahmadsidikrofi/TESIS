import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PoppinsBold from '../../Components/Fonts/PoppinsBold';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Burnt from "burnt"
import { CheckCircle } from "@phosphor-icons/react";

const PolarCodePage = () => {
    const navigation = useNavigation()
    const [inputCode, setInputCode] = useState('')
    const [isCodeSuccess, setIsCodeSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getAccessToken = () => {
        setIsLoading(true)
        setTimeout(async() => {
            setIsLoading(false)
            Burnt.toast({
                title: "Kode benar, silahkan mendaftar.",
                preset: "done",
            })
            const inputBody = {
                grant_type: 'authorization_code',
                code: inputCode,
                redirect_uri: 'https://flowbeat123.vercel.app/auth/callback'
            }
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Basic NTVhNjljODMtZTBlOC00Zjk1LWFiYjYtNDkxZmRhZjk2OTVjOjBlZWQ5YmIxLWM1OGUtNGE0OS05MTM2LWIxOTQzZmFkMzhiOQ=='
            }
            await axios.post('https://polarremote.com/v2/oauth2/token', inputBody, { headers })
            .then((response) => {
                console.log(response.data)
                AsyncStorage.setItem('access_token', response.data.access_token)
                AsyncStorage.setItem('token_type', response.data.token_type)
                AsyncStorage.setItem('x_user_id', response.data.x_user_id.toString())
                setIsCodeSuccess(true)
            })
            .catch((error) => console.error('Error get access to Polar Code:', error))
        }, 2000)
    }

    const handleRegistPartner = async () => {
        const accessToken = await AsyncStorage.getItem('access_token')
        if (accessToken) {
            const inputBody = `
                <register>
                    <member-id>user_123</member-id>
                </register>`
            const headers = {
                'Content-Type':'application/xml',  
                'Accept':'application/json',  
                'Authorization':`Bearer ${accessToken}`
            }
            await axios.post('https://www.polaraccesslink.com/v3/users', inputBody, { headers })
            .then(() => {
                navigation.navigate('MainApp')
            }).catch((err) => {
                if (err.response.status === 409) {
                    navigation.navigate('MainApp')
                    Burnt.toast({
                        title: "User telah terdaftar.",
                        preset: "done",
                    })
                } else {
                    navigation.navigate('MainApp')
                    Burnt.toast({
                        title: "No content and user has not accept all mandatory.",
                        preset: "done",
                    })
                }
            })
        }
    }

    return (
        <SafeAreaView>
            <View className="px-4 my-6">
                <PoppinsBold><Text className="text-lg">Input Polar Code</Text></PoppinsBold>
                <Text className='text-gray-400 font-pregular'>Silahkan Masukkan Kode Yang Telah Kamu Terima</Text>
                <View className='mt-5 mb-2'>
                    <Text className='font-pregular'>Polar Code</Text>
                </View>
                <View className="mb-4">
                    <TextInput
                        className="font-pregular h-[55px] text-[13px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500"
                        placeholder="Masukkan kode"
                        onChangeText={(text) => setInputCode(text)}
                        keyboardType='numeric'
                    />
                </View>
                <TouchableOpacity
                    disabled={isCodeSuccess}
                    onPress={getAccessToken}
                    className={`rounded-[8px] h-[55px] justify-center items-center mb-3 ${isCodeSuccess ? 'bg-blue-500 opacity-50' : 'bg-blue-500'}`}
                >
                    
                    <View className="flex flex-row gap-2 items-center">
                        <Text>{isLoading ? <ActivityIndicator color="#ffffff"/> : null}</Text>
                        <Text className="text-lg text-white font-pbold">Submit</Text>
                    </View>
                </TouchableOpacity>
                {isCodeSuccess ? (
                    <TouchableOpacity
                        onPress={handleRegistPartner}
                        className="bg-blue-500 rounded-[8px] h-[55px] justify-center items-center mb-3"
                    >
                        <Text className='text-lg text-white font-pbold'>Register</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </SafeAreaView>
    );
}
 
export default PolarCodePage;