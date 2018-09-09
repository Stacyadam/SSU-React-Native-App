import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/shared/buttons/Button';
import Divider from '../shared/Divider';
import ModalHeader from '../headers/ModalHeader';
import { askForHelp } from '../../actions/AccountActions';

import UiSettings from '../../config/UiSettings';

const { greyTwo, errorRed, orange, greySix } = UiSettings.styles.colors;

class Help extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	state = {
		message: '',
		errors: null
	};

	componentDidUpdate(prevProps) {
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	render() {
		return (
			<View>
				<ModalHeader title="HELP" navigator={this.props.navigator} />
				<View style={{ padding: 20 }}>
					<View style={{ paddingHorizontal: 30, marginTop: 10 }}>
						<Text style={{ fontSize: 20, textAlign: 'center', color: greySix }}>
							HAVE A QUESTION? WE'RE HERE TO HELP
						</Text>
					</View>
					<View style={{ paddingHorizontal: 10, marginTop: 10 }}>
						<Text style={{ textAlign: 'center', color: orange }}>
							VISIT OUR FAQ PAGE TO SEE IF YOUR QUESTION'S ALREADY BEEN ANSWERED
						</Text>
					</View>
					<Button onPress={this.goToFAQ} style={{ width: '40%', height: 40, marginVertical: 20 }}>
						FAQ
					</Button>
					<Divider width={3} color={greyTwo} style={{ marginBottom: 10 }} />
					{this.state.errors && this.state.errors.message ? (
						<Text style={{ fontSize: 12, marginBottom: 6, color: errorRed }}>
							Please enter a question/message
						</Text>
					) : (
						<Text style={{ fontSize: 12, marginBottom: 6 }}>Message</Text>
					)}
					<TextInput
						style={{
							borderColor: orange,
							borderWidth: 1,
							marginBottom: 10,
							height: 100,
							paddingRight: 20
						}}
						multiline
						onChangeText={message => this.setState({ message })}
						value={this.state.message}
						autoCorrect={false}
						autoCapitalize="sentences"
					/>
					<Button
						loading={this.props.loading}
						onPress={() => this.props.askForHelp(this.state.message)}
						style={{ width: '40%', height: 40 }}
					>
						SUBMIT
					</Button>
				</View>
			</View>
		);
	}

	goToFAQ = () => {
		this.props.navigator.showModal({ screen: 'SSU.FAQ' });
	};
}

const mapStateToProps = state => ({
	loading: state.global.loading,
	errors: state.global.errors
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	askForHelp: async message => {
		const success = await dispatch(askForHelp(message));
		if (success) ownProps.navigator.dismissModal();
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Help);
