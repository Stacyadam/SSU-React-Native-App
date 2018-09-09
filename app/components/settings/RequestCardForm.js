import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Button from '../shared/buttons/Button';
import RadioButton from '../forms/RadioButton';
import UiSettings from '../../config/UiSettings';
import Divider from '../shared/Divider';
import { updateUser } from '../../actions/SettingsActions';

const { greyOne, greyTwo, errorRed, orange } = UiSettings.styles.colors;

class RequestCardForm extends Component {
	state = {
		address1: '',
		address2: '',
		city: '',
		state: '',
		zip: ''
	};

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<Text style={{ marginVertical: 30, fontSize: 20 }}>REQUEST A CARD</Text>

				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<Image
						source={{
							uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
						}}
						style={{
							width: 125,
							height: 75,
							borderRadius: 5,
							marginBottom: 30
						}}
					/>
					<View style={{ paddingHorizontal: 12 }}>
						<Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>
							Complete the form below, and we'll send out a new member card right away.
						</Text>
					</View>
					<View style={{ width: 240 }}>
						<Text style={{ fontSize: 12, marginBottom: 6 }}>Address 1</Text>
						<TextInput
							style={{
								borderColor: orange,
								borderWidth: 1,
								marginBottom: 10,
								height: 30,
								paddingRight: 20
							}}
							onChangeText={address1 => this.setState({ address1 })}
							value={this.state.address1}
							autoCorrect={false}
							autoCapitalize="none"
						/>
						<Text style={{ fontSize: 12, marginBottom: 6 }}>Address 2</Text>
						<TextInput
							style={{
								borderColor: orange,
								borderWidth: 1,
								marginBottom: 10,
								height: 30,
								paddingRight: 20
							}}
							onChangeText={address2 => this.setState({ address2 })}
							value={this.state.address2}
							autoCorrect={false}
							autoCapitalize="none"
						/>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
							<View style={{ flex: 2, marginRight: 6 }}>
								<Text style={{ fontSize: 12, marginBottom: 6 }}>City</Text>
								<TextInput
									style={{
										borderColor: orange,
										borderWidth: 1,
										marginBottom: 10,
										height: 30,
										paddingRight: 20
									}}
									onChangeText={city => this.setState({ city })}
									value={this.state.city}
									autoCorrect={false}
									autoCapitalize="none"
								/>
							</View>
							<View style={{ flex: 0.75, marginRight: 6 }}>
								<Text style={{ fontSize: 12, marginBottom: 6 }}>State</Text>
								<TextInput
									style={{
										borderColor: orange,
										borderWidth: 1,
										marginBottom: 10,
										height: 30,
										paddingRight: 20
									}}
									onChangeText={state => this.setState({ state })}
									value={this.state.state}
									autoCorrect={false}
									autoCapitalize="none"
								/>
							</View>
							<View style={{ flex: 1 }}>
								<Text style={{ fontSize: 12, marginBottom: 6 }}>Zip Code</Text>
								<TextInput
									style={{
										borderColor: orange,
										borderWidth: 1,
										marginBottom: 10,
										height: 30,
										paddingRight: 20
									}}
									onChangeText={zip => this.setState({ zip })}
									value={this.state.zip}
									autoCorrect={false}
									autoCapitalize="none"
								/>
							</View>
						</View>
						<Button loading={false} onPress={() => console.log('hi')}>
							Save
						</Button>
					</View>
				</View>
			</View>
		);
	}
}

export default RequestCardForm;
