import React, { PureComponent } from 'react';
import { View } from 'react-native';
import UiSettings from '../../../config/UiSettings';

const { orange, darkOrange, blue } = UiSettings.styles.colors;

class ThreeDots extends PureComponent {
	render() {
		const { dotOne, dotTwo, dotThree, style } = this.props;
		const Circle = ({ style, dotColor }) => (
			<View style={[{ height: 20, width: 20, backgroundColor: dotColor, borderRadius: 50 }, style]} />
		);

		return (
			<View style={[{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }, style]}>
				<Circle dotColor={dotOne} />
				<Circle dotColor={dotTwo} style={{ marginHorizontal: 8 }} />
				<Circle dotColor={dotThree} />
			</View>
		);
	}
}

export default ThreeDots;
