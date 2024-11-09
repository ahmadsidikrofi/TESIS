import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
	{ label: 'Pria', value: 'Pria' },
	{ label: 'Wanita', value: 'Wanita' },
];

const DropdownGender = ({ setJenis_kelamin, jenis_kelamin }) => {
	const [value, setValue] = useState(jenis_kelamin);
	const [isFocus, setIsFocus] = useState(false);
	const [isSaved, setIsSaved] = useState(false); // Langkah 1: State untuk menunjukkan apakah nilai sudah disimpan atau tidak

	useEffect(() => {
		setValue(jenis_kelamin)
	}, [jenis_kelamin]);

	useEffect(() => {
		if (isSaved) { // Langkah 3: Setelah nilai disimpan, atur kembali isFocus menjadi false
			setIsFocus(false);
		}
	}, [isSaved]);

	return (
		<View style={styles.container}>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				data={data}
				maxHeight={400}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? 'Pilih kelamin' : '...'}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={item => {
					setValue(item.value);
					setJenis_kelamin(item.value);
					setIsSaved(true); // Langkah 2: Setelah nilai dipilih, atur isSaved menjadi true
				}}
			/>
		</View>
	);
};

export default DropdownGender;

const styles = StyleSheet.create({
	container: {
		borderRadius: 13,
		width: 165,
	},
	dropdown: {
		height: 50,
		borderColor: '#a7a6a6',
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
