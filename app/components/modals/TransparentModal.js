import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, FlatList } from 'react-native';

class TransparentModal extends Component {
	render() {
		const { visible, children } = this.props;
		return (
			<Modal transparent animationType="fade" visible={visible}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0,0,0,0.5)'
					}}
				>
					{children}
				</View>
			</Modal>
		);
	}
}

export default TransparentModal;
