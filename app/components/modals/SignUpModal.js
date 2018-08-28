import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import SSUIcon from '../shared/icons/SSUIcon';
import Input from '../forms/Input';
import UiSettings from '../../config/UiSettings';
import RadioButton from '../forms/RadioButton';
import SignUpFirst from '../forms/SignUpFirst';
import SignUpSecond from '../forms/SignUpSecond';
import SignUpThird from '../forms/SignUpThird';
import { prevStep } from '../../actions/AccountActions';

const { orange, greyFour } = UiSettings.styles.colors;

class SignUpModal extends Component {
	/*============================================================
	 == Render Methods
	/============================================================*/

	render() {
		const { step } = this.props;
		return (
			<Modal animationType="slide" transparent={false} visible={this.props.visible}>
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
					<TouchableOpacity onPress={() => this.navigateModal()} style={{ position: 'absolute', left: 16 }}>
						<SSUIcon name="angle-left" color="#FFF" size={26} />
					</TouchableOpacity>
					<Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>SIGN UP</Text>
				</View>
				{step === 1 && <SignUpFirst />}
				{step === 2 && <SignUpSecond />}
				{step === 3 && <SignUpThird />}
			</Modal>
		);
	}

	navigateModal() {
		const { step } = this.props;
		if (step === 1) {
			this.props.closeModal();
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
	prevStep: () => {
		dispatch(prevStep());
	}
});

/*============================================================
 == Styles
/============================================================*/

const styles = StyleSheet.create({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpModal);
