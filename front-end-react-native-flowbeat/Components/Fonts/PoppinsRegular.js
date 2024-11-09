import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PoppinsRegular = (props) => {
	return <Text style={{ ...styles.pregular, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	pregular: {
		fontFamily: 'Poppins-Regular',
	},
});

export default PoppinsRegular

