import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import UiSettings from '../../config/UiSettings';

const { orange } = UiSettings.styles.colors;

class DropList extends PureComponent {
	render() {
		const { defaultValue, options, onSelect } = this.props;
		return (
			<ModalDropdown
				onSelect={() => onSelect()}
				style={{
					backgroundColor: orange,
					borderRadius: 10,
					paddingVertical: 10,
					paddingLeft: 40
				}}
				textStyle={{ color: '#FFF' }}
				defaultValue={defaultValue}
				dropdownStyle={{
					borderColor: orange,
					borderWidth: 1,
					marginLeft: -40,
					marginTop: 4,
					width: '87.5%'
				}}
				options={options.map(option => [option])}
				renderSeparator={() => <View style={{ borderTopWidth: 1, borderTopColor: orange }} />}
			/>
		);
	}
}

export default DropList;
