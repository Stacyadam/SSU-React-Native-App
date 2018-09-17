import React, { Component } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Button from '../shared/buttons/Button';
import RadioButton from '../forms/RadioButton';
import UiSettings from '../../config/UiSettings';
import Divider from '../shared/Divider';
import { updateUser } from '../../actions/SettingsActions';

const { greyOne, greyTwo, errorRed, orange } = UiSettings.styles.colors;

class EditProfileForm extends Component {
	state = {
		originalPhone: this.props.user.phone,
		phone: this.props.user.phone,
		originalEmail: this.props.user.email,
		email: this.props.user.email,
		first_name: this.props.user.first_name,
		last_name: this.props.user.last_name,
		zip_code: this.props.user.zip_code,
		birthday: this.props.user.birthday,
		errors: {},
		gender: this.props.user.gender,

		password: '',
		text: ''
	};

	componentDidUpdate(prevProps) {
		if (prevProps.user.email !== this.props.user.email) {
			this.setState({ originalEmail: this.props.user.email });
		}
		if (prevProps.user.phone !== this.props.user.phone) {
			this.setState({ originalPhone: this.props.user.phone });
		}
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	render() {
		return (
			<KeyboardAwareScrollView style={{ flex: 1 }} extraScrollHeight={10}>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 10
					}}
				>
					<Image
						source={require('../../assets/generic_user.png')}
						style={{
							width: 125,
							height: 125,
							borderRadius: 62.5,
							marginBottom: 10
						}}
					/>
				</View>
				{this.props.editIndex === 0 && (
					<View>
						<View
							style={{
								backgroundColor: greyOne,
								marginHorizontal: 10,
								marginBottom: 10,
								paddingTop: 10,
								paddingHorizontal: 20,
								borderRadius: 10
							}}
						>
							<Text
								style={{
									fontFamily: 'Omnes-Regular',
									fontSize: 18,
									textAlign: 'center',
									fontWeight: 'bold',
									marginVertical: 10
								}}
							>
								Personal Information
							</Text>

							<Text style={{ fontFamily: 'Omnes-Regular', marginBottom: 6 }}>First Name</Text>
							<TextInput
								style={{ borderBottomColor: greyTwo, borderBottomWidth: 2, marginBottom: 20 }}
								onChangeText={first_name => this.setState({ first_name })}
								value={this.state.first_name}
								autoCapitalize="words"
								returnKeyType="done"
								autoCorrect={false}
							/>
							<Text style={{ fontFamily: 'Omnes-Regular', marginBottom: 6 }}>Last Name</Text>
							<TextInput
								style={{ borderBottomColor: greyTwo, borderBottomWidth: 2, marginBottom: 20 }}
								onChangeText={last_name => this.setState({ last_name })}
								value={this.state.last_name}
								autoCapitalize="words"
								returnKeyType="done"
								autoCorrect={false}
							/>
							{this.state.errors && this.state.errors.zip_code ? (
								<Text
									style={{
										fontFamily: 'Omnes-Regular',

										marginBottom: 6,
										color: errorRed
									}}
								>
									{this.state.errors.zip_code[0]}
								</Text>
							) : (
								<Text style={{ fontFamily: 'Omnes-Regular', marginBottom: 6 }}>Zip Code</Text>
							)}

							<TextInput
								style={{ borderBottomColor: greyTwo, borderBottomWidth: 2, marginBottom: 20 }}
								onChangeText={zip_code => this.setState({ zip_code })}
								value={this.state.zip_code}
								keyboardType="number-pad"
								autoCorrect={false}
								returnKeyType="done"
								maxLength={5}
							/>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'flex-start',
									alignItems: 'center',
									marginBottom: 20
								}}
							>
								<Text style={{ fontFamily: 'Omnes-Regular', marginRight: 5 }}>Male</Text>
								<RadioButton
									color={greyTwo}
									backgroundColor={orange}
									selected={this.state.gender === 'M'}
									checked={this.state.gender === 'M'}
									onPress={() => this.setState({ gender: 'M' })}
									style={{ marginRight: 10 }}
								/>
								<Text style={{ fontFamily: 'Omnes-Regular', marginRight: 5 }}>Female</Text>
								<RadioButton
									color={greyTwo}
									backgroundColor={orange}
									selected={this.state.gender === 'F'}
									checked={this.state.gender === 'F'}
									onPress={() => this.setState({ gender: 'F' })}
									style={{ marginRight: 10 }}
								/>
								<Text style={{ fontFamily: 'Omnes-Regular', marginRight: 5 }}>N/A</Text>
								<RadioButton
									color={greyTwo}
									backgroundColor={orange}
									selected={this.state.gender === 'O'}
									checked={this.state.gender === 'O'}
									onPress={() => this.setState({ gender: 'O' })}
									style={{ marginRight: 10 }}
								/>
							</View>
							{this.state.errors && this.state.errors.birthday ? (
								<Text
									style={{
										fontFamily: 'Omnes-Regular',

										marginBottom: 6,
										color: errorRed
									}}
								>
									{this.state.errors.birthday[0]}
								</Text>
							) : (
								<Text style={{ fontFamily: 'Omnes-Regular', marginBottom: 6 }}>Date of Birth</Text>
							)}
							<DatePicker
								style={{ width: 200 }}
								date={this.state.birthday}
								mode="date"
								placeholder="select date"
								format="YYYY-MM-DD"
								minDate="1900-01-01"
								maxDate="2018-12-12"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								showIcon={false}
								customStyles={{
									dateInput: {
										position: 'absolute',
										left: 0,
										top: 0,
										borderWidth: 0,
										marginTop: -12
									},
									dateText: {
										color: 'black'
									},
									btnText: {
										position: 'relative'
									}
									// ... You can check the source to find the other keys.
								}}
								onDateChange={birthday => {
									this.setState({ birthday });
								}}
							/>
							<Divider width={2} color={greyTwo} style={{ marginTop: -24, marginBottom: 20 }} />
						</View>
						<View
							style={{
								backgroundColor: greyOne,
								marginHorizontal: 10,
								paddingTop: 10,
								paddingHorizontal: 20,
								borderRadius: 10
							}}
						>
							<Text
								style={{
									fontFamily: 'Omnes-Regular',
									fontSize: 18,
									textAlign: 'center',
									fontWeight: 'bold',
									marginVertical: 10
								}}
							>
								Contact Information
							</Text>
							{this.state.errors && this.state.errors.email ? (
								<Text
									style={{
										fontFamily: 'Omnes-Regular',

										marginBottom: 6,
										color: errorRed
									}}
								>
									{this.state.errors.email[0]}
								</Text>
							) : (
								<Text style={{ fontFamily: 'Omnes-Regular', marginBottom: 6 }}>Email</Text>
							)}
							<TextInput
								style={{ borderBottomColor: greyTwo, borderBottomWidth: 2, marginBottom: 20 }}
								onChangeText={email => this.setState({ email })}
								value={this.state.email}
								keyboardType="email-address"
								returnKeyType="done"
								autoCorrect={false}
							/>
							{this.state.errors && this.state.errors.phone ? (
								<Text
									style={{
										fontFamily: 'Omnes-Regular',

										marginBottom: 6,
										color: errorRed
									}}
								>
									{this.state.errors.phone[0]}
								</Text>
							) : (
								<Text style={{ fontFamily: 'Omnes-Regular', marginBottom: 6 }}>Phone Number</Text>
							)}
							<TextInput
								style={{ borderBottomColor: greyTwo, borderBottomWidth: 2, marginBottom: 20 }}
								onChangeText={phone => this.setState({ phone })}
								value={this.state.phone}
								keyboardType="phone-pad"
								autoCorrect={false}
								returnKeyType="done"
								maxLength={10}
							/>
						</View>

						<Button
							style={{ marginVertical: 20, width: '40%' }}
							loading={this.props.loading}
							onPress={() => this.updateAccountInfo()}
						>
							Save
						</Button>
					</View>
				)}
				{this.props.editIndex === 1 && (
					<View>
						<View
							style={{
								backgroundColor: greyOne,
								marginHorizontal: 10,
								marginBottom: 10,
								paddingTop: 10,
								paddingHorizontal: 20,
								borderRadius: 10
							}}
						>
							<Text
								style={{
									fontFamily: 'Omnes-Regular',
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: 18,
									marginVertical: 10
								}}
							>
								New Password
							</Text>
							{this.state.errors && this.state.errors.password ? (
								<Text
									style={{
										fontFamily: 'Omnes-Regular',
										marginBottom: 6,
										color: errorRed
									}}
								>
									{this.state.errors.password[0] && 'Please enter a new password'}
								</Text>
							) : (
								<Text style={{ fontFamily: 'Omnes-Regular', marginBottom: 6 }}>Password</Text>
							)}
							<TextInput
								style={{ borderBottomColor: greyTwo, borderBottomWidth: 2, marginBottom: 20 }}
								onChangeText={password => this.setState({ password })}
								value={this.state.password}
								autoCorrect={false}
								autoCapitalize="none"
								returnKeyType="done"
								secureTextEntry
							/>
						</View>

						<Button
							style={{ width: '40%' }}
							loading={this.props.loading}
							onPress={() => this.updatePassword()}
						>
							Save
						</Button>
					</View>
				)}
			</KeyboardAwareScrollView>
		);
	}

	async updateAccountInfo() {
		const {
			user: { id }
		} = this.props;
		const {
			first_name,
			last_name,
			zip_code,
			birthday,
			email,
			phone,
			originalEmail,
			originalPhone,
			gender
		} = this.state;
		const user = {
			id,
			first_name,
			last_name,
			zip_code,
			birthday,
			gender,
			...(originalEmail !== email && { email }),
			...(originalPhone !== phone && { phone })
		};

		const success = await this.props.updateUser(user);
		if (success) this.props.onSuccess();
	}

	async updatePassword() {
		const {
			user: { id }
		} = this.props;
		const { password } = this.state;
		const user = {
			id,
			password
		};

		const success = await this.props.updateUser(user);
		if (success) this.props.onSuccess();
	}
}

const mapStateToProps = state => ({
	errors: state.global.errors,
	success: state.global.success,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	updateUser: async user => await dispatch(updateUser(user))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditProfileForm);
