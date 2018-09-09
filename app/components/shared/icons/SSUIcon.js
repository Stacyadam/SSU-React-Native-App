import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SSUIcon extends PureComponent {
	render() {
		const { name, size, color, style } = this.props;
		return (
			<View style={style}>
				<Icon name={name} size={size} color={color} />
			</View>
		);
	}
}

export default SSUIcon;
