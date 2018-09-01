import React, { PureComponent } from 'react';
import { View, Text, TextInput } from 'react-native';
import UiSettings from '../../config/UiSettings';
import ModalSelector from 'react-native-modal-selector';

const { orange } = UiSettings.styles.colors;

class SelectList extends PureComponent {
	state = {
		textInputValue: ''
	};

	render() {
		const { defaultValue, options, onSelect } = this.props;

		let index = 0;
		const data = [
			{ key: index++, section: true, label: 'Fruits' },
			{ key: index++, label: 'Red Apples' },
			{ key: index++, label: 'Cherries' },
			{ key: index++, label: 'Cranberries' },
			{ key: index++, label: 'Pink Grapefruit' },
			{ key: index++, label: 'Raspberries' },
			{ key: index++, section: true, label: 'Vegetables' },
			{ key: index++, label: 'Beets' },
			{ key: index++, label: 'Red Peppers' },
			{ key: index++, label: 'Radishes' },
			{ key: index++, label: 'Radicchio' },
			{ key: index++, label: 'Red Onions' },
			{ key: index++, label: 'Red Potatoes' },
			{ key: index++, label: 'Rhubarb' },
			{ key: index++, label: 'Tomatoes' }
		];
		return (
			<View style={{ flex: 1, justifyContent: 'space-around', padding: 50 }}>
				<ModalSelector
					data={data}
					initValue="Select something yummy!"
					onChange={option => {
						this.setState({ textInputValue: option.label });
					}}
				>
					<TextInput
						style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, height: 30 }}
						editable={false}
						placeholder="Select something yummy!"
						value={this.state.textInputValue}
					/>
				</ModalSelector>
			</View>
		);
	}
}

export default SelectList;
