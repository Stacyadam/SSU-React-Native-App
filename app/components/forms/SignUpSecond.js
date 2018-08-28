import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Input from './Input';
import UiSettings from '../../config/UiSettings';
import Button from '../shared/buttons/Button';
import ThreeDots from '../shared/icons/ThreeDots';
import { validateInput } from '../../actions/AccountActions';

const { orange, darkOrange, blue } = UiSettings.styles.colors;

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
		const B = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

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
					<Input
						label="First Name"
						value={this.state.first_name}
						onChangeText={first_name => this.setState({ first_name })}
						returnKeyType="next"
						keyboardType="phone-pad"
						error={
							this.props.errors && this.props.errors.first_name ? this.props.errors.first_name[0] : null
						}
						style={{
							marginBottom: 10
						}}
					/>
					<Input
						label="Last Name"
						value={this.state.last_name}
						onChangeText={last_name => this.setState({ last_name })}
						returnKeyType="next"
						keyboardType="phone-pad"
						error={this.props.errors && this.props.errors.last_name ? this.props.errors.last_name[0] : null}
						style={{
							marginBottom: 10
						}}
					/>
					<Input
						label="Phone(10-digits)"
						value={this.state.phone}
						onChangeText={phone => this.setState({ phone })}
						returnKeyType="next"
						keyboardType="phone-pad"
						error={this.props.errors && this.props.errors.phone ? this.props.errors.phone[0] : null}
						style={{
							marginBottom: 10
						}}
					/>
					<Input
						label="Zip Code"
						value={this.state.zip_code}
						onChangeText={zip_code => this.setState({ zip_code })}
						returnKeyType="done"
						keyboardType="phone-pad"
						error={this.props.errors && this.props.errors.zip_code ? this.props.errors.zip_code[0] : null}
						style={{
							marginBottom: 10
						}}
					/>
				</View>
				<Button
					fontSize={12}
					height={10}
					width="40%"
					style={{ marginTop: 4, marginBottom: 10 }}
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
	errors: state.account.errors
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
