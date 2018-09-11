import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import Input from './Input';
import UiSettings from '../../config/UiSettings';
import Button from '../shared/buttons/Button';
import ThreeDots from '../shared/icons/ThreeDots';
import { validateInput } from '../../actions/AccountActions';

const { orange, darkOrange, blue, errorRed } = UiSettings.styles.colors;

class SignUpSecond extends Component {
	state = {
		first_name: '',
		last_name: '',
		phone: '',
		zip_code: ''
	};

	/*============================================================
	 == Render Methods
	/============================================================*/

	render() {
		const B = ({ children }) => <Text style={{ fontFamily: 'Omnes-Regular',fontWeight: 'bold' }}>{children}</Text>;

		return (
			<View
				style={{
					display: 'flex',
					height: '100%'
				}}
			>
				<Text
					style={{
						marginVertical: 14,
						textAlign: 'center',
						color: orange,
						fontSize: 20,
						lineHeight: 30
					}}
				>
					GREAT!
				</Text>
				<Text
					style={{
						textAlign: 'center',
						fontSize: 12,
						lineHeight: 18,
						paddingHorizontal: 10,
						marginBottom: 4
					}}
				>
					NOW, LET'S MAKE SURE YOUR DEALS AND REWARDS ARE ALWAYS WITH YOU
					{'\n'} WHEN YOU NEED THEM...
				</Text>
				<View style={{ paddingHorizontal: 24 }}>
					{this.props.errors && this.props.errors.first_name ? (
						<Text style={{ fontFamily: 'Omnes-Regular',fontSize: 12, marginBottom: 6, color: errorRed }}>
							{this.props.errors.first_name[0]}
						</Text>
					) : (
						<Text style={{ fontFamily: 'Omnes-Regular',fontSize: 12, marginBottom: 6, color: blue }}>First Name</Text>
					)}
					<View
						style={{
							borderColor: blue,
							borderWidth: 1,
							marginBottom: 10,
							height: 36,
							paddingRight: 20,
							justifyContent: 'center',
							paddingLeft: 10
						}}
					>
						<TextInput
							onChangeText={first_name => this.setState({ first_name })}
							value={this.state.first_name}
							autoCorrect={false}
							autoCapitalize="none"
						/>
					</View>

					{this.props.errors && this.props.errors.last_name ? (
						<Text style={{ fontFamily: 'Omnes-Regular',fontSize: 12, marginBottom: 6, color: errorRed }}>
							{this.props.errors.last_name[0]}
						</Text>
					) : (
						<Text style={{ fontFamily: 'Omnes-Regular',fontSize: 12, marginBottom: 6, color: blue }}>Last Name</Text>
					)}
					<View
						style={{
							borderColor: blue,
							borderWidth: 1,
							marginBottom: 10,
							height: 36,
							paddingRight: 20,
							justifyContent: 'center',
							paddingLeft: 10
						}}
					>
						<TextInput
							onChangeText={last_name => this.setState({ last_name })}
							value={this.state.last_name}
							autoCorrect={false}
							autoCapitalize="none"
						/>
					</View>

					{this.props.errors && this.props.errors.phone ? (
						<Text style={{ fontFamily: 'Omnes-Regular',fontSize: 12, marginBottom: 6, color: errorRed }}>
							{this.props.errors.phone[0]}
						</Text>
					) : (
						<Text style={{ fontFamily: 'Omnes-Regular',fontSize: 12, marginBottom: 6, color: blue }}>Phone(10-digits)</Text>
					)}
					<View
						style={{
							borderColor: blue,
							borderWidth: 1,
							marginBottom: 10,
							height: 36,
							paddingRight: 20,
							justifyContent: 'center',
							paddingLeft: 10
						}}
					>
						<TextInput
							onChangeText={phone => this.setState({ phone })}
							value={this.state.phone}
							autoCorrect={false}
							autoCapitalize="none"
							maxLength={10}
							keyboardType="phone-pad"
						/>
					</View>

					{this.props.errors && this.props.errors.zip_code ? (
						<Text style={{ fontFamily: 'Omnes-Regular',fontSize: 12, marginBottom: 6, color: errorRed }}>
							{this.props.errors.zip_code[0]}
						</Text>
					) : (
						<Text style={{ fontFamily: 'Omnes-Regular',fontSize: 12, marginBottom: 6, color: blue }}>Zip Code</Text>
					)}
					<View
						style={{
							borderColor: blue,
							borderWidth: 1,
							marginBottom: 20,
							height: 36,
							paddingRight: 20,
							justifyContent: 'center',
							paddingLeft: 10
						}}
					>
						<TextInput
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
					loading={this.props.loading}
					style={{ marginBottom: 10 }}
					onPress={() =>
						this.props.validateInput({
							first_name: this.state.first_name,
							last_name: this.state.last_name,
							phone: this.state.phone,
							zip_code: this.state.zip_code
						})
					}
				>
					CONTINUE
				</Button>
				<Text
					style={{ textAlign: 'center', fontSize: 10, marginHorizontal: 20, lineHeight: 16, marginBottom: 8 }}
				>
					By clicking <B>Continue</B> you will now be able to redeem offers & earn rewards in stores using
					your phone number.
				</Text>
				<ThreeDots dotOne={orange} dotTwo={darkOrange} dotThree={blue} />
			</View>
		);
	}

	/*============================================================
	 == Methods
	/============================================================*/
}

const mapStateToProps = state => ({
	errors: state.global.errors,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	validateInput: data => {
		dispatch(validateInput(data));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpSecond);
