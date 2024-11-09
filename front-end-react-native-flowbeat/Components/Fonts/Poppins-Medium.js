import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PoppinsMedium = (props) => {
	return <Text style={{ ...styles.pmedium, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	pmedium: {
		fontFamily: 'Poppins-Medium',
	},
});

export default PoppinsMedium

