import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Router from './router';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';

const App = () => {
	const [fontLoaded] = useFonts({
		'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
	})
	if (!fontLoaded) {
		return <Text>Text tidak tersedia</Text>
	}
	return (
		<NavigationContainer>
			<View style={styles.container}>
				<Router />
			</View>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});


export default App
