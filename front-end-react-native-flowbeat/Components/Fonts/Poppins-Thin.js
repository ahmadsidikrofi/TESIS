import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PoppinsThin = (props) => {
	return <Text style={{ ...styles.pthin, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	pthin: {
		fontFamily: 'Poppins-Thin',
	},
});

export default PoppinsThin
