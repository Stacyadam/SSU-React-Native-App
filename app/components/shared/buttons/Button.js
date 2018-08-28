import React, { PureComponent } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import UiSettings from '../../../config/UiSettings';

const { orange } = UiSettings.styles.colors;

class Button extends PureComponent {
	render() {
		const {
			style,
			bgColor,
			color,
			children,
			onPress,
			align,
			width,
			height,
			fontWeight,
			fontSize,
			marginVertical
		} = this.props;
		return (
			<TouchableOpacity
				onPress={() => onPress()}
				style={[
					{
						backgroundColor: bgColor,
						justifyContent: 'center',
						alignSelf: align,
						alignItems: 'center',
						paddingVertical: height,
						marginVertical,
						width
					},
					style
				]}
			>
				<Text style={{ color, fontWeight, fontSize }}>{children}</Text>
			</TouchableOpacity>
		);
	}
}

Button.defaultProps = {
	align: 'center',
	bgColor: orange,
	color: '#FFF',
	fontWeight: 'bold',
	fontSize: 18,
	height: 14,
	marginVertical: 20,
	width: '60%'
};

export default Button;
