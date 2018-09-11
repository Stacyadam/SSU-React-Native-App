import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import Button from '../shared/buttons/Button';
import RadioButton from '../forms/RadioButton';
import UiSettings from '../../config/UiSettings';
import Divider from '../shared/Divider';
import { requestMemberCard } from '../../actions/MemberCardActions';

const { greyOne, greyTwo, errorRed, orange } = UiSettings.styles.colors;

class RequestCardForm extends Component {
	state = {
		name: '',
		address_line_1: '',
		address_line_2: '',
		city: '',
		state: '',
		zip_code: '',
		errors: []
	};

	componentDidUpdate(prevProps) {
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<KeyboardAwareScrollView
					contentContainerStyle={{
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ fontFamily: 'Omnes-Regular', marginVertical: 30, fontSize: 22 }}>
						REQUEST A CARD
					</Text>
					<Image
						source={require('../../assets/member-card.png')}
						style={{
							width: 125,
							height: 75,
							borderRadius: 5,
							marginBottom: 20
						}}
					/>
					<View style={{ paddingHorizontal: 12 }}>
						<Text
							style={{ fontFamily: 'Omnes-Regular', textAlign: 'center', fontSize: 16, marginBottom: 10 }}
						>
							Complete the form below, and we'll send out a new member card right away.
						</Text>
					</View>
					<View style={{ width: 240 }}>
						{this.state.errors && this.state.errors.name ? (
							<Text
								style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6, color: errorRed }}
							>
								{this.state.errors.name[0]}
							</Text>
						) : (
							<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }}>Name</Text>
						)}
						<TextInput
							style={{
								borderColor: orange,
								borderWidth: 1,
								marginBottom: 10,
								height: 30
							}}
							onChangeText={name => this.setState({ name })}
							value={this.state.name}
							autoCorrect={false}
							autoCapitalize="none"
						/>
						{this.state.errors && this.state.errors.address_line_1 ? (
							<Text
								style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6, color: errorRed }}
							>
								{this.state.errors.address_line_1[0]}
							</Text>
						) : (
							<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }}>
								Address 1
							</Text>
						)}
						<TextInput
							style={{
								borderColor: orange,
								borderWidth: 1,
								marginBottom: 10,
								height: 30
							}}
							onChangeText={address_line_1 => this.setState({ address_line_1 })}
							value={this.state.address_line_1}
							autoCorrect={false}
							autoCapitalize="none"
						/>
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }}>Address 2</Text>
						<TextInput
							style={{
								borderColor: orange,
								borderWidth: 1,
								marginBottom: 10,
								height: 30
							}}
							onChangeText={address_line_2 => this.setState({ address_line_2 })}
							value={this.state.address_line_2}
							autoCorrect={false}
							autoCapitalize="none"
						/>
						{this.state.errors &&
							(this.state.errors.city || this.state.errors.state || this.state.errors.zip_code) && (
								<Text
									style={{
										fontFamily: 'Omnes-Regular',
										fontSize: 14,
										marginBottom: 6,
										color: errorRed
									}}
								>{`${this.state.errors.city ? 'City' : ''} ${this.state.errors.state ? 'State' : ''} ${
									this.state.errors.zip_code ? 'Zip Code' : ''
								} required.`}</Text>
							)}
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
							<View style={{ flex: 2, marginRight: 6 }}>
								{this.state.errors && this.state.errors.city ? (
									<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }} />
								) : (
									<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }}>
										City
									</Text>
								)}
								<TextInput
									style={{
										borderColor: orange,
										borderWidth: 1,
										marginBottom: 10,
										height: 30
									}}
									onChangeText={city => this.setState({ city })}
									value={this.state.city}
									autoCorrect={false}
									autoCapitalize="none"
								/>
							</View>
							<View style={{ flex: 0.75, marginRight: 6 }}>
								{this.state.errors && this.state.errors.state ? (
									<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }} />
								) : (
									<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }}>
										State
									</Text>
								)}
								<TextInput
									style={{
										borderColor: orange,
										borderWidth: 1,
										marginBottom: 10,
										height: 30
									}}
									onChangeText={state => this.setState({ state })}
									value={this.state.state}
									autoCorrect={false}
									autoCapitalize="none"
									maxLength={2}
								/>
							</View>
							<View style={{ flex: 1 }}>
								{this.state.errors && this.state.errors.zip_code ? (
									<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }} />
								) : (
									<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6 }}>
										Zip Code
									</Text>
								)}

								<TextInput
									style={{
										borderColor: orange,
										borderWidth: 1,
										marginBottom: 10,
										height: 30
									}}
									onChangeText={zip_code => this.setState({ zip_code })}
									value={this.state.zip_code}
									autoCorrect={false}
									autoCapitalize="none"
									keyboardType="number-pad"
									maxLength={5}
								/>
							</View>
						</View>
						<Button
							style={{ marginBottom: 20 }}
							loading={this.props.loading}
							onPress={() => this.requestMemberCard()}
						>
							SUBMIT
						</Button>
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}

	requestMemberCard() {
		const { name, address_line_1, address_line_2, city, state, zip_code } = this.state;
		const userInfo = {
			name,
			address_line_1: address_line_2 ? `${address_line_1} ${address_line_2}` : address_line_1,
			city,
			state,
			zip_code
		};
		this.props.requestMemberCard(userInfo);
	}
}

const mapStateToProps = state => ({
	loading: state.global.loading,
	errors: state.global.errors
});

const mapDispatchToProps = dispatch => ({
	requestMemberCard: userInfo => dispatch(requestMemberCard(userInfo))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RequestCardForm);
