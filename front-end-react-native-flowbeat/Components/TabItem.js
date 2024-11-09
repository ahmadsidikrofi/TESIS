import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import icons from '../constants/icons';

// Create a styled component
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const TabItem = ({ isFocused, onPress, onLongPress, label }) => {
	const Icon = () => {
		let iconSource;
		switch (label) {
			case 'Home':
				iconSource = icons.home;
				break;
			case 'Notes':
				iconSource = icons.note;
				break;
			case 'Profile':
				iconSource = icons.profile;
				break;
			default:
				iconSource = null;
		}
		return (
			<Image
				source={iconSource}
				style={{ width: 20, height: 20, tintColor: isFocused ? '#074173' : '#BFCFE7' }}
			/>
		);
	};

	return (
		<StyledTouchableOpacity
			onPress={onPress}
			onLongPress={onLongPress}
			className="flex-1 items-center"
		>
			<Icon />
			<StyledText
				className='text-[10px] font-pregular mt-1'
				style={{ color: isFocused ? '#074173' : '#BFCFE7' }}>
				{label}
			</StyledText>
		</StyledTouchableOpacity>
	);
};

export default TabItem;
