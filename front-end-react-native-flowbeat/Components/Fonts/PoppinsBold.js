import React from 'react';
import { Text, StyleSheet } from 'react-native';

const PoppinsBold = (props) => {
	return <Text style={{ ...styles.pbold, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	pbold: {
		fontFamily: 'Poppins-Bold',
	},
});

export default PoppinsBold;
