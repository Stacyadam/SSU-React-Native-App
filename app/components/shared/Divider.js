import React, { PureComponent } from 'react';
import { View } from 'react-native';
class Divider extends PureComponent {
	render() {
		const { width, color, marginVertical, style } = this.props;

		return (
			<View
				style={{
					borderTopColor: color,
					borderTopWidth: width,
					marginVertical,
					...style
				}}
			/>
		);
	}
}

export default Divider;
