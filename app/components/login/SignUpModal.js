import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import SSUIcon from '../shared/icons/SSUIcon';
import UiSettings from '../../config/UiSettings';
import SignUpFirst from '../forms/SignUpFirst';
import SignUpSecond from '../forms/SignUpSecond';
import SignUpThird from '../forms/SignUpThird';
import { prevStep } from '../../actions/AccountActions';
import { updateErrors } from '../../actions/GlobalActions';

const { orange } = UiSettings.styles.colors;

class SignUpModal extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		const { step } = this.props;
		return (
			<View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						height: 60,
						backgroundColor: orange,
						paddingTop: 8
					}}
				>
					<TouchableOpacity
						onPress={() => this.navigateModal()}
						style={{ position: 'absolute', left: 16, top: 20 }}
					>
						<SSUIcon name="angle-left" color="#FFF" size={26} />
					</TouchableOpacity>
					<Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>SIGN UP</Text>
				</View>
				{step === 1 && <SignUpFirst navigator={this.props.navigator} />}
				{step === 2 && <SignUpSecond />}
				{step === 3 && <SignUpThird />}
			</View>
		);
	}

	navigateModal() {
		const { step } = this.props;
		if (step === 1) {
			this.props.navigator.dismissAllModals();
		} else {
			this.props.prevStep();
		}
	}

	/*============================================================
	 == Methods
	/============================================================*/
}

const mapStateToProps = state => ({
	step: state.account.step
});

const mapDispatchToProps = dispatch => ({
	prevStep: () => dispatch(prevStep())
});

/*============================================================
 == Styles
/============================================================*/

const styles = StyleSheet.create({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpModal);
