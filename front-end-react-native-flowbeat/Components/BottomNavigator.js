import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import TabItem from './TabItem';

const BottomNavigator = ({ state, descriptors, navigation }) => {
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardVisible(true);
		});
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardVisible(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	if (isKeyboardVisible) {
		return null; // Hide the Bottom Navigator when keyboard is visible
	}

	return (
		<View className='flex-row bg-white justify-between px-3 py-3 w-full'>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TabItem
						key={index}
						label={label}
						isFocused={isFocused}
						onPress={onPress}
						onLongPress={onLongPress}
					/>
				);
			})}
		</View>
	);
}

export default BottomNavigator;
